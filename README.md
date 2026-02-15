# COLORS Application

**The COLORS application is a server system used to store a database of colors for every individual user created in the database. Users will log in with credentials that have been pre-created on the server by the server owner, then they may freely insert and search their personal color list at their leisure.**

## Technologies Used

The application was run on a LAMP server hosted by DigitalOcean. All default, and cheapest, options were used to host the droplet as it isn't very resource intensive.
Besides hosting, I secured a domain name through GoDaddy, but this step can be skipped if you don't care that people will have to connect to your server via an IP address.
Lastly, you're obviously going to want a device capable of SSH and FTP so that you may access your server remotely. DigitalOcean provides a terminal through their website, but I'm unsure if devices without traditional terminals/SSH can use it.

**The LAMP Server**

LAMP: Linux, Apache, MySQL, Perl/PHP/Python. These are the components that make up a LAMP server and are the backbone of the application. The system runs on Ubuntu Linux; web services are processed by Apache; the database is handled through MySQL; and the API(?) is handled through PHP.

## Setup Instructions
1. Get a LAMP Server (doesn't matter where)
    + If you have not already done so, be sure to update everything on it.
2. Create the MySQL database
    1. Log in with a username and password
    2. Create the database
    3. Add a table for *Users* and a table for *Colors*.
        + The *Users* need a field for `ID`, `FirstName`, `LastName`, `Login`, and `Password`. Auto-generate a primary key for `ID`.
        + The *Colors* need a field for `ID`, `Name`: the color itself, and `UserID`: the ID of the user who owns that instance of the color. Auto-generate a primary key for `ID`.
    + Note: There is nothing preventing duplicate entries for colors; different users can also have the same color, because they are stored with different UserIDs.
3. Clone the repository
    + `git clone https://github.com/Cuckhands/colors-application.git /var/www/html`
    + If this fails because something is already in there, either move it using `mv` or delete it using `-rm rf /var/www/html`
    + You also have the option of naming the directory something else; mine was located in `/var/www/hath.site`, because that was the name of my website.
4. Rename any variables referencing the incorrect webpages or logins, such as `urlBase` in line one of `js/code.js` and the username/password combo around lines 7-8 for the database in the `LAMPAPI/*.php` files.

## Accessing the Application

To use the application, simply connect to the IP address in your browser, or enter the website URL if you set up your domain, and log in with one of the *Users* that you created during Setup, step 2, sub-step 3.

## Addendum

**If you're setting up this application, I would expect you to have some basic knowledge about UNIX systems, specifically Ubuntu Linux.** If you're unsure how to proceed at any point, feel free to ask your AI of choice on how to proceed; I do not have time to tell anyone how to set this up myself.

**You can't delete a color from an account using the website.** To delete a color, you need to log directly into the database using MySQL and *manually* delete the item. That's obviously not very convenient, so feel free to create an API call and button that allows for deletion.

**If you want the site to be secure, you will need to go through the effort of securing it yourself, likely using Certbot on Apache.** It's not overwhelmingly difficult to set up, but it definitely isn't intuitive. I had to use AI myself to make sense of all the errors I was getting.
