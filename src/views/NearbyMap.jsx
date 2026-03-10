import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const NearbyMap = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const [status, setStatus] = useState({ type: 'loading', text: 'Tap the button below to find facilities near your current location.' });
    const [facilities, setFacilities] = useState([]);
    const [isLocating, setIsLocating] = useState(false);

    useEffect(() => {
        // Standard Leaflet icon fix for missing assets in build
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const initMap = (lat, lon) => {
        if (mapRef.current) mapRef.current.remove();

        mapRef.current = L.map(mapContainerRef.current).setView([lat, lon], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapRef.current);

        const userIcon = L.divIcon({
            className: '',
            html: `<div style="width:16px;height:16px;background:#6f42c1;border:3px solid white;border-radius:50%;box-shadow:0 0 10px rgba(0,0,0,0.5);"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        L.marker([lat, lon], { icon: userIcon }).addTo(mapRef.current).bindPopup("<b>You are here</b><br>Currently searching near this point.");
    };

    const fetchWithFallback = async (query) => {
        const endpoints = [
            'https://overpass-api.de/api/interpreter',
            'https://overpass.kumi.systems/api/interpreter',
            'https://overpass.osm.ch/api/interpreter'
        ];

        for (const url of endpoints) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: "data=" + encodeURIComponent(query)
                });
                if (response.ok) return await response.json();
            } catch (e) {
                console.warn(`Mirror ${url} failed, trying next...`);
            }
        }
        throw new Error("All mirrors failed");
    };

    const fetchFacilities = async (lat, lon) => {
        setStatus({ type: 'loading', text: 'Fetching medical facilities from OpenStreetMap...' });
        const radius = 5000;
        const query = `[out:json][timeout:25];
      (
        node["amenity"="hospital"](around:${radius},${lat},${lon});
        way["amenity"="hospital"](around:${radius},${lat},${lon});
        node["amenity"="clinic"](around:${radius},${lat},${lon});
        node["amenity"="doctors"](around:${radius},${lat},${lon});
        node["amenity"="pharmacy"](around:${radius},${lat},${lon});
        node["amenity"="first_aid"](around:${radius},${lat},${lon});
      );
      out center;`;

        try {
            const data = await fetchWithFallback(query);
            if (data && data.elements) {
                renderFacilities(data.elements, lat, lon);
            } else {
                throw new Error("No data returned");
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', text: 'Failed to fetch facilities. The map service may be busy. Please try again in a few seconds.' });
            setIsLocating(false);
        }
    };

    const renderFacilities = (elements, userLat, userLon) => {
        // DEDUPLICATE
        const seen = new Set();
        let sorted = elements
            .map(e => ({
                id: e.id,
                name: e.tags.name || "Medical Facility",
                amenity: e.tags.amenity,
                lat: e.lat || e.center.lat,
                lon: e.lon || e.center.lon,
                phone: e.tags.phone || e.tags['contact:phone'] || null,
                dist: getDistanceKm(userLat, userLon, e.lat || e.center.lat, e.lon || e.center.lon)
            }))
            .filter(f => {
                if (seen.has(f.name + f.lat)) return false;
                seen.add(f.name + f.lat);
                return true;
            })
            .sort((a, b) => a.dist - b.dist);

        const results = sorted.slice(0, 30);
        setFacilities(results);

        // Update Markers
        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];

        const colorMap = { hospital: '#dc3545', clinic: '#007bff', doctors: '#007bff', pharmacy: '#28a745' };
        const emojiMap = { hospital: '🏥', clinic: '🩺', doctors: '👨‍⚕️', pharmacy: '💊' };

        results.forEach((f, i) => {
            const color = colorMap[f.amenity] || '#fd7e14';
            const emoji = emojiMap[f.amenity] || '➕';
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${f.lat},${f.lon}&travelmode=driving`;

            const markerIcon = L.divIcon({
                className: '',
                html: `<div style="width:14px;height:14px;background:${color};border:2.5px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
                iconSize: [14, 14],
                iconAnchor: [7, 7]
            });

            const marker = L.marker([f.lat, f.lon], { icon: markerIcon }).addTo(mapRef.current).bindPopup(`
        <b>${emoji} ${f.name}</b><br>
        <span style="color:#888;font-size:0.85em;">${f.amenity.replace('_', ' ')}</span><br>
        ${f.dist.toFixed(2)} km away<br><br>
        <a href="${mapsUrl}" target="_blank" style="display:inline-block;background:#007bff;color:white;padding:5px 12px;border-radius:20px;font-size:0.82rem;font-weight:600;text-decoration:none;">
          🧭 Navigate
        </a>
      `);
            markersRef.current.push(marker);
        });

        setStatus({ type: 'success', text: `Found ${results.length} facilities within 5km. Tap 🧭 Navigate on any card to get directions.` });
        setIsLocating(false);
    };

    const getDistanceKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const handleLocate = () => {
        setIsLocating(true);
        setStatus({ type: 'loading', text: 'Detecting your location...' });

        if (!navigator.geolocation) {
            setStatus({ type: 'error', text: 'Geolocation is not supported by your browser.' });
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                initMap(latitude, longitude);
                fetchFacilities(latitude, longitude);
            },
            (error) => {
                setStatus({ type: 'error', text: 'Unable to retrieve your location. Check browser permissions.' });
                setIsLocating(false);
            }
        );
    };

    const focusFacility = (f, i) => {
        if (mapRef.current) {
            mapRef.current.setView([f.lat, f.lon], 17);
            if (markersRef.current[i]) markersRef.current[i].openPopup();
            mapContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="view-nearby" className="view-section active">
            <h2 className="section-title"><i className="fas fa-map-marked-alt" style={{ color: 'var(--primary)' }}></i> Nearby Medical Facilities</h2>
            <p className="section-subtitle">Locating hospitals, clinics, pharmacies & first-aid centers near you.</p>

            <div className={`map-status-bar ${status.type}`}>
                {status.type === 'loading' && <i className="fas fa-spinner fa-spin"></i>}
                {status.type === 'success' && <i className="fas fa-check-circle"></i>}
                {status.type === 'error' && <i className="fas fa-exclamation-circle"></i>}
                <span>&nbsp; {status.text}</span>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
                <button className="btn btn-primary" onClick={handleLocate} disabled={isLocating} style={{ fontSize: '1rem', padding: '13px 30px' }}>
                    <i className="fas fa-location-arrow"></i> {isLocating ? 'Locating...' : 'Detect My Location & Search'}
                </button>
            </div>

            <div id="map-container" ref={mapContainerRef} style={{ height: '450px' }}></div>

            <div className="map-legend">
                <div className="legend-item"><div className="legend-dot" style={{ background: '#dc3545' }}></div> Hospital</div>
                <div className="legend-item"><div className="legend-dot" style={{ background: '#007bff' }}></div> Clinic / Doctor</div>
                <div className="legend-item"><div className="legend-dot" style={{ background: '#28a745' }}></div> Pharmacy</div>
                <div className="legend-item"><div className="legend-dot" style={{ background: '#fd7e14' }}></div> First Aid / Other</div>
                <div className="legend-item"><div className="legend-dot" style={{ background: '#6f42c1' }}></div> Your Location</div>
            </div>

            <div className="facility-list">
                {facilities.map((f, i) => (
                    <div
                        key={f.id + i}
                        className={`facility-card ${f.amenity}`}
                        onClick={() => focusFacility(f, i)}
                    >
                        <h4>{f.name}</h4>
                        <p>{f.amenity.replace(/_/g, ' ')} &bull; {f.dist.toFixed(2)} km away</p>
                        {f.phone && <p style={{ marginTop: '4px' }}><a href={`tel:${f.phone}`} style={{ color: 'var(--primary)' }} onClick={(e) => e.stopPropagation()}>{f.phone}</a></p>}
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${f.lat},${f.lon}&travelmode=driving`}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '10px', background: '#007bff', color: 'white', padding: '7px 16px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '600', textDecoration: 'none' }}
                        >
                            🧭 Navigate
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NearbyMap;
