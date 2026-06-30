# Presley Fine Arts — Easy Editing Setup

This version adds a private admin area at `/admin` using Decap CMS + Netlify.

Important: the admin editor requires your Netlify site to be connected to GitHub, not only drag-and-drop upload.

## What you can edit in /admin
- Gallery name, address, email, phone, hours
- Artists
- Artist bios
- Works under each artist
- Catalogue/publication entries

## Setup overview
1. Create a GitHub account if you do not have one.
2. Upload this whole folder to a new GitHub repository.
3. In Netlify, create a new site from that GitHub repository.
4. In Netlify, enable Identity.
5. In Netlify, enable Git Gateway.
6. Invite yourself as a user.
7. Visit `https://presleyfinearts.com/admin` and log in.

## Netlify settings
In Netlify, open your site, then:
- Site configuration → Identity → Enable Identity
- Registration preferences → Invite only
- Services → Git Gateway → Enable Git Gateway
- Identity → Invite users → invite your email

After accepting the email invite, go to `/admin`.

## Updating the live site
When you save/publish changes in `/admin`, Netlify will rebuild and publish the site automatically.
