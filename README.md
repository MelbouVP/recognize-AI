# Recognize AI 

Recognize AI is an application that can detect human faces in an image based on the user's input image.

<img src="https://github.com/MelbouVP/recognize-AI/blob/master/readme_assets/RecognizeAI-2.png" />

**Application live-demo can be seen at https://recognize-ai.herokuapp.com/**

## Table of contents 
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Features](#features)
* [Project status](#project-status)

## Introduction

Main goal of this project was to learn and understand React.js & Node.js, with most focus on the former. 

Recognize AI is an application that can detect human faces in an image based on the user's input images that they provide via URL. Images are processed by an AI algorithm that tracks faces (up to 20 faces in one image) - this process in enabled by using Clarifai API. 

Besides core functionality, this application has a database that allows for user login/signup, track of how many times user has provided images for proccessing and the ability to delete user account.

## Technologies

* **React.js** (v. 16.13.1) - front-end
* **Node.js** (v. 13.12.0) - back-end
* **PostgreSQL** (node-postgres v. 8.0.3) - database 
* **Express** (v. 4.17.1) - back-end server
* **Knex.js** (v. 0.21.1) - ORM query builder
* **Clarifai** (v. 2.9.1) - face recognition API
* **Utility tech** - bcrypt, cookie-parser, cors, dotenv, nodemon

## Features

**1. Image recognition**

<p align="center">
  <img src="https://github.com/MelbouVP/recognize-AI/blob/master/readme_assets/Recognize-core-functionality.gif" width="550" height="350"/>
  <br/>
  <br/>
  <br/>
  <br/>
  <img src="https://github.com/MelbouVP/recognize-AI/blob/master/readme_assets/Recognize-core-functionality2.gif" width="550" height="350"/>
</p>
<br/>
<br/>

**2. User signup & validation**
<br/>
<br/>
<p align="center">
  <img src="https://github.com/MelbouVP/recognize-AI/blob/master/readme_assets/Signup-validation8.gif" width="450" height="350"/>
</p>
<br/>
<br/>

**3. User login & validation**
<br/>
<br/>
<p align="center">
  <img src="https://github.com/MelbouVP/recognize-AI/blob/master/readme_assets/Login-validation.gif" width="450" height="350"/>
</p>
<br/>
<br/>

**4. Account deletion**
<br/>
<br/>
<p align="center">
  <img src="https://github.com/MelbouVP/recognize-AI/blob/master/readme_assets/Account-deletion.gif" width="450" height="350"/>
</p>

## Project status

**Project is finished.**

Although there is certainly room for improvement.  Many things have been learned, e.g. it is easier, faster and safer to use a library such as **Joi** or **Yup** for login/signup validation on front-end & back-end instead of writing the validation yourself. 
