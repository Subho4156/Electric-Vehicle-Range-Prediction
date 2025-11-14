'use client';

import React, { useState } from 'react';
import { Battery, Zap, Car, Gauge, Settings, TrendingUp } from 'lucide-react';

export default function EVRangePrediction() {
  const [formData, setFormData] = useState({
    battery_capacity_kWh: 75,
    top_speed_kmh: 200,
    acceleration_0_100_s: 7.5,
    fast_charging_power_kw_dc: 150,
    torque_nm: 400,
    efficiency_wh_per_km: 160,
    seats: 5,
    length_mm: 4700,
    width_mm: 1850,
    height_mm: 1600,
    towing_capacity_kg: 1000,
    cargo_volume_l: 500,
    drivetrain: 'RWD',
    segment: 'JD - Large',
    car_body_type: 'SUV'
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const drivetrainOptions = ['FWD', 'RWD', 'AWD'];
  const segmentOptions = [
    'B - Compact',
    'C - Medium',
    'D - Large',
    'E - Executive',
    'F - Luxury',
    'G - Sports',
    'JA - Mini',
    'JB - Compact',
    'JC - Medium',
    'JD - Large',
    'JE - Executive',
    'JF - Luxury',
    'N - Passenger Van'
  ];
  const bodyTypeOptions = [
    'SUV',
    'Sedan',
    'Hatchback',
    'Coupe',
    'Station/Estate',
    'Liftback Sedan',
    'Small Passenger Van'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      setPrediction(data.predicted_range);
    } catch (err) {
      setError('Failed to predict range. Make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Battery className="w-12 h-12 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">EV Range Predictor</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Predict your electric vehicle&apos;s driving range using machine learning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
              {/* Battery & Performance */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-xl font-semibold text-gray-800">Battery & Performance</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Battery Capacity (kWh)
                    </label>
                    <input
                      type="number"
                      name="battery_capacity_kWh"
                      value={formData.battery_capacity_kWh}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Efficiency (Wh/km)
                    </label>
                    <input
                      type="number"
                      name="efficiency_wh_per_km"
                      value={formData.efficiency_wh_per_km}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Top Speed (km/h)
                    </label>
                    <input
                      type="number"
                      name="top_speed_kmh"
                      value={formData.top_speed_kmh}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Acceleration (0-100 km/h (seconds))
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="acceleration_0_100_s"
                      value={formData.acceleration_0_100_s}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Torque (Nm)
                    </label>
                    <input
                      type="number"
                      name="torque_nm"
                      value={formData.torque_nm}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fast Charging (kW)
                    </label>
                    <input
                      type="number"
                      name="fast_charging_power_kw_dc"
                      value={formData.fast_charging_power_kw_dc}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Specifications */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Car className="w-5 h-5 text-blue-500" />
                  <h2 className="text-xl font-semibold text-gray-800">Vehicle Specifications</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Drivetrain
                    </label>
                    <select
                      name="drivetrain"
                      value={formData.drivetrain}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {drivetrainOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Body Type
                    </label>
                    <select
                      name="car_body_type"
                      value={formData.car_body_type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {bodyTypeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Segment
                    </label>
                    <select
                      name="segment"
                      value={formData.segment}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {segmentOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seats
                    </label>
                    <input
                      type="number"
                      name="seats"
                      value={formData.seats}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Dimensions */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-purple-500" />
                  <h2 className="text-xl font-semibold text-gray-800">Dimensions & Capacity</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Length (mm)
                    </label>
                    <input
                      type="number"
                      name="length_mm"
                      value={formData.length_mm}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Width (mm)
                    </label>
                    <input
                      type="number"
                      name="width_mm"
                      value={formData.width_mm}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (mm)
                    </label>
                    <input
                      type="number"
                      name="height_mm"
                      value={formData.height_mm}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cargo Volume (L)
                    </label>
                    <input
                      type="number"
                      name="cargo_volume_l"
                      value={formData.cargo_volume_l}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Towing Capacity (kg)
                    </label>
                    <input
                      type="number"
                      name="towing_capacity_kg"
                      value={formData.towing_capacity_kg}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Predicting...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Predict Range
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Gauge className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-800">Prediction Result</h2>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {prediction !== null ? (
                <div className="space-y-4">
                  <div className="bg-linear-to-br from-green-50 to-blue-50 rounded-xl p-6 text-center">
                    <p className="text-gray-600 text-sm mb-2">Predicted Range</p>
                    <p className="text-5xl font-bold text-green-600 mb-1">
                      {Math.round(prediction)}
                    </p>
                    <p className="text-gray-500">kilometers</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Battery Efficiency</span>
                      <span className="font-semibold text-gray-800">
                        {(prediction / formData.battery_capacity_kWh).toFixed(1)} km/kWh
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Full Charge Time (approx)</span>
                      <span className="font-semibold text-gray-800">
                        {((formData.battery_capacity_kWh / formData.fast_charging_power_kw_dc) * 60).toFixed(0)} min
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Energy per 100km</span>
                      <span className="font-semibold text-gray-800">
                        {((formData.efficiency_wh_per_km * 100) / 1000).toFixed(1)} kWh
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      Prediction based on machine learning model trained on real EV data
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Battery className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Fill in the vehicle details and click &quot;Predict Range&quot; to see the estimated driving range
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow p-6">
            <Battery className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Battery Capacity</h3>
            <p className="text-sm text-gray-600">
              Larger battery capacity generally results in longer driving range
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <Zap className="w-8 h-8 text-yellow-500 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Efficiency</h3>
            <p className="text-sm text-gray-600">
              Lower Wh/km means better efficiency and longer range per charge
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <Car className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Vehicle Type</h3>
            <p className="text-sm text-gray-600">
              Body type and segment affect aerodynamics and overall efficiency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
