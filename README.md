🚗⚡ Electric Vehicle Range Prediction
A machine learning project that predicts the driving range of electric vehicles based on various technical specifications and features.

🎯 Overview
This project uses Linear Regression to predict the range (in kilometers) of electric vehicles based on technical specifications like battery capacity, efficiency, drivetrain type, vehicle dimensions, and more. The model helps understand which factors most significantly impact EV range.
✨ Features

Comprehensive Feature Set: Analyzes 15+ features including:

Battery capacity (kWh)
Energy efficiency (Wh/km)
Vehicle dimensions (length, width, height)
Drivetrain type (FWD, RWD, AWD)
Charging specifications
Vehicle segment and body type


Easy-to-Use Prediction Function: Simple API for predicting range with custom parameters
Model Persistence: Save and load trained models for deployment
Data Preprocessing Pipeline: Handles categorical encoding and data cleaning

📊 Dataset
The dataset contains electric vehicle specifications including:

Numeric Features: battery_capacity_kWh, top_speed_kmh, torque_nm, efficiency_wh_per_km, acceleration_0_100_s, fast_charging_power_kw_dc, towing_capacity_kg, seats, length_mm, width_mm, height_mm
Categorical Features: drivetrain, segment, car_body_type, cargo_volume_l, fast_charge_port
Target Variable: range_km (driving range in kilometers)

📈 Model Performance

Algorithm: Linear Regression
R² Score: ~0.95 (varies based on data split)
Mean Absolute Error (MAE): ~45 km
Features Used: 174 (after one-hot encoding)

Key Insights

Battery capacity has the strongest positive impact on range (+96.5 km per kWh)
Energy efficiency significantly affects range (-19.9 km per Wh/km increase)
Vehicle segment (Luxury, Executive) positively influences range
Height and length have slight negative correlations with range

🔧 Technologies Used

Python 3.8+
pandas: Data manipulation and analysis
NumPy: Numerical computing
scikit-learn: Machine learning algorithms
Matplotlib & Seaborn: Data visualization
Joblib: Model serialization

⭐ If you found this project helpful, please give it a star! ⭐
