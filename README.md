# UI/UX Designer Portfolio Website

<img src="./preview.png"/>

![Vercel](https://vercelbadge.vercel.app/api/emilohlund-git/sirine-portfolio-final)

This repository contains the code for a dynamic portfolio website built for a UI/UX designer. The website is designed to showcase the designer's projects and provide a visually appealing and user-friendly experience for visitors. The website is built using Next.js 13 and utilizes Pocketbase as the backend service for managing project data. Media files uploaded through the website are stored on DigitalOcean.

## Technologies Used

- **Next.js 13:** Next.js is a popular React framework for building server-side rendered (SSR) and static websites. It provides a powerful development environment with features like server-side rendering, automatic code splitting, and hot module replacement.

- **Pocketbase:** Pocketbase is a backend-as-a-service (BaaS) provider used as the backend service for managing project data in this portfolio website. It allows for dynamic content management and provides an intuitive interface for adding and updating projects.

- **Fly.io:** Fly.io is a hosting platform used to deploy and manage the Pocketbase backend service. The VM on Fly.io hosts the Pocketbase service, ensuring reliable and scalable performance.

- **DigitalOcean:** DigitalOcean is a cloud infrastructure provider used for storing uploaded media files. It provides secure and scalable storage options, ensuring that media files are readily accessible for display on the portfolio website.

## Project Structure

The project follows a typical Next.js folder structure:

- `/app`: This directory contains the pages of the portfolio website. Each file in this directory represents a specific page or route of the website.

- `/components`: The `/components` directory contains reusable React components used throughout the website. These components help structure the UI and provide consistent styling.

- `/styles`: CSS styles for the website are stored in this directory. The project may utilize CSS modules or a CSS-in-JS approach to style the components.

- `/public`: Static assets like images, fonts, or other files that need to be served directly are stored in this directory.

- `/utils`: Utility functions or helper modules may be placed in this directory to handle specific tasks or provide additional functionality.

## Getting Started

To get the portfolio website up and running locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/portfolio-website.git
```

2. Navigate to the project directory:

```bash
cd portfolio-website
```

3. Install the dependencies:

```bash
npm install
```

4. Configure Pocketbase backend:

- Access your Pocketbase account and set up a new project.
- Retrieve the Pocketbase API key and configure it in the project settings or `.env` file.

5. Configure DigitalOcean for media storage:

- Set up a DigitalOcean Spaces bucket or any other storage solution of your choice.
- Retrieve the access key and secret key for the bucket and configure them in the Pocketbase admin UI settings.

6. Run the development server:

```bash
npm run dev
```

The website should now be accessible at [http://localhost:3000](http://localhost:3000).

## Deployment

To deploy the portfolio website to a production environment, follow these steps:

1. Set up a hosting environment compatible with Next.js, such as Vercel, Netlify, or your preferred hosting provider.

2. Configure the necessary environment variables for the deployment environment, including the Pocketbase API key and DigitalOcean access keys.

3. Connect your repository to the hosting platform and deploy the website using the appropriate deployment commands or integrations.

4. Once deployed, the portfolio website will be accessible to visitors at the provided deployment URL.

## Contributing

Contributions to the portfolio website project are welcome! If you find any issues or would like to suggest improvements, please feel free to open an issue or submit a pull request.

When contributing, please adhere to the existing code style and conventions. Additionally, make sure to follow the project's code of conduct and respect the guidelines for contributing.

## License

The portfolio website is open source and released under the [MIT License](LICENSE). Feel free to modify and adapt the codebase according to your needs.
