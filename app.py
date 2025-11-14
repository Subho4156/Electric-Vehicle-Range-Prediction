from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

# Load the trained model
model_data = joblib.load("linear_regression_ev_model.pkl")
lr = model_data['model']
training_columns = model_data['columns']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.json
        
        # Create DataFrame with all training columns initialized to 0
        new_car = pd.DataFrame(0, index=[0], columns=training_columns, dtype=float)
        
        # Set numeric features
        numeric_features = [
            'battery_capacity_kWh', 'top_speed_kmh', 'acceleration_0_100_s',
            'fast_charging_power_kw_dc', 'torque_nm', 'efficiency_wh_per_km',
            'seats', 'length_mm', 'width_mm', 'height_mm', 'towing_capacity_kg'
        ]
        
        for feature in numeric_features:
            if feature in data:
                new_car.at[0, feature] = float(data[feature])
        
        # Set categorical features
        drivetrain = data.get('drivetrain', 'RWD')
        if f'drivetrain_{drivetrain}' in training_columns:
            new_car.at[0, f'drivetrain_{drivetrain}'] = 1
        
        segment = data.get('segment', 'JD - Large')
        if f'segment_{segment}' in training_columns:
            new_car.at[0, f'segment_{segment}'] = 1
        
        car_body_type = data.get('car_body_type', 'SUV')
        if f'car_body_type_{car_body_type}' in training_columns:
            new_car.at[0, f'car_body_type_{car_body_type}'] = 1
        
        # Handle cargo volume (find closest match)
        cargo_volume_l = int(data.get('cargo_volume_l', 500))
        cargo_cols = [col for col in training_columns if col.startswith('cargo_volume_l_')]
        
        if cargo_cols:
            cargo_values = []
            for col in cargo_cols:
                try:
                    val = int(col.replace('cargo_volume_l_', ''))
                    cargo_values.append((col, val))
                except:
                    pass
            
            if cargo_values:
                closest = min(cargo_values, key=lambda x: abs(x[1] - cargo_volume_l))
                new_car.at[0, closest[0]] = 1
        
        # Make prediction
        predicted_range = lr.predict(new_car)[0]
        
        return jsonify({
            'success': True,
            'predicted_range': round(predicted_range, 2)
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model_loaded': True})

if __name__ == '__main__':
    app.run(debug=True, port=5000)