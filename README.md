# Movie Analyzer

## 1. Introduction

Movie Analyzer is a React-based web application that allows users to view and analyze data about movies. This data is exposed via a REST API and is based on publicly available data from IMDB and other sources. The data describes a subset of movies released since 1990.

The main aims of this project are to:

- Build a sophisticated client web application using modern approaches
- Provide experience in querying REST APIs and presenting the results on a web page
- Provide experience with modern web technologies such as React

## 2. The Dataset

The movies dataset we are using is based on publicly available data from IMDB and other sources. The data describes a subset of movies released since 1990. All interactions should take place via our published REST API. You will be able to fetch the movie data using HTTP GET operations. You will also need to handle a registration and login process from your React application to the API through appropriate HTTP POST requests.

## 3. The REST API

The REST API is published and documented at: http://127.0.0.1:3000. The documentation on the index page was created using Swagger. The Swagger Docs are your primary source for anything to do with the API during this assignment. They will be maintained more regularly than this specification, and they have executable examples.

### Data endpoints 

- GET /movies/search
- GET /movies/data/{imdbID}
- GET /people/{id}

### Authentication endpoints 

- POST /user/register
- POST /user/login
- POST /user/refresh
- POST /user/logout

## 4. Installation

To install the project, you need to have Node.js and npm installed on your machine. Then, you can clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/movie-analyzer.git
cd movie-analyzer
npm install
```

## 5. Usage

To start the development server, run:

```bash
npm run dev
```

To build the project for production, run:

```bash
npm run build
```

To preview the production build, run:

```bash
npm run preview
```

## 6. Dependencies

The project uses the following dependencies:

- React
- Axios
- MobX
- React Router DOM
- Yup
- DayJS
- Chart.js
- TailwindCSS
- And many others (see `package.json` for more details)

## 7. Contributing

Contributions are welcome! Please read the [contribution guidelines](CONTRIBUTING.md) first.

## 8. License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.