# TodoMVC++ : Taking TodoMVC To Production

TodoMVC++ is the companion application for Zero to Production with Node.js.
To learn more about how this application works, check out the video course on 
[Frontend Masters](https://www.frontendmasters.com).

This application is based on [TodoMVC](http://todomvc.com/), and specifically
on a [Vue.js implementation](http://todomvc.com/examples/vue/) by Evan You.

## Running Locally

### Installing Node.js and npm

This application has been tested on Node.js 6 and npm 3 - these packages should
be available for download [here](https://nodejs.org/en/) - choose the "Current"
version for download.

### Installing Node.js modules

Once you have Node and npm installed and this repository downloaded, you'll need
to install the application's dependencies. Do this with:

    npm install

For development you'll probably want to install the following modules globally:

    npm install -g grunt-cli sequelize-cli

### Setting up the database

To run this application locally, you'll require a Postgres database. On a Mac,
the easiest path to installing Postgres is [Homebrew](http://brew.sh/). Once
installed, grab Postgres with:

    brew update
    brew install postgres

If Postgres is installed using the method above, you should now have a few 
Postgres administrative commands on your system path. Begin by firing up another
Terminal tab and starting the database:

    postgres -D /usr/local/var/postgres

Next, create the development and test databases:

    createdb todos
    createdb todos-test

If Postgres is **not** installed locally, you can setup a free instance as follows:
- visit https://elephantsql.com
- login and setup a *free* tiny turtle instance
- goto "Details" and copy the url. It should look something like this [postgres://abcdefg:icRAC...](https://customer.elephantsql.com/instance)
- in the project, copy `config/test.js` to `config/user.js`
- set `config.databaseUrl` to your copied postgres url
- don't forget to run `sequelize db:migrate`

Apply the database migrations:

    sequelize db:migrate
    
Copy over static assets:

    grunt collect_static
    
### Running the application

To run the application in development mode:

    grunt

To run the application simulating production settings:

    NODE_ENV=production
    grunt collect_static
    npm start

## License

MIT
    
