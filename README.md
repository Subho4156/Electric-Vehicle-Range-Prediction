# 🚗⚡ Electric Vehicle Range Prediction System

A full-stack machine learning application that predicts electric vehicle driving range using Linear Regression. The system includes data preprocessing, model training, a Flask REST API backend, and a modern Next.js frontend interface.

---

## 📘 Project Overview  

This project provides an end-to-end solution for predicting electric vehicle range based on technical specifications. Users can input vehicle parameters through an intuitive web interface and receive instant predictions powered by a machine learning model trained on real EV data.  

Key Capabilities:

- Predict EV range based on 15+ vehicle parameters
- Real-time predictions through REST API
- Interactive web interface with instant feedback
- Model trained on comprehensive EV dataset
- Handles categorical and numerical features

---

## ✨ Features  

Machine Learning

- Linear Regression Model with 174 features (after one-hot encoding)
- High Accuracy: R² Score ~0.85, MAE ~45 km
- Feature Engineering: Automatic handling of categorical variables
- Model Persistence: Serialized model with Joblib for deployment

Backend API

- RESTful API built with Flask
- CORS Support for cross-origin requests
- Input Validation and error handling
- Health Check Endpoint for monitoring
- Fast Response Times (<100ms per prediction)

Frontend Interface

- Modern UI built with Next.js 14 and React
- Responsive Design that works on all devices
- Real-time Validation of user inputs
- Interactive Forms with dropdown menus and number inputs
- Visual Feedback with loading states and error messages
- Detailed Results including efficiency metrics

---

## 🛠️ Tech Stack

Machine Learning & Data Science

- Python 3.8+
- pandas: Data manipulation and preprocessing
- NumPy: Numerical computations
- scikit-learn: Machine learning algorithms
- Joblib: Model serialization

Backend

- Flask 3.0+: Web framework
- Flask-CORS: Cross-origin resource sharing

Frontend

- Next.js 14: React framework
- React 18: UI library
- Tailwind CSS: Styling
- Lucide React: Icon library
