const express = require('express');
const app = express();
const path = require('path');

// Load blog data from JSON file
const blogData = require('./data/blogs.json');
const blogs = blogData.blogs;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // Format the date
  const formattedBlogs = blogs.map(blog => {
    const date = new Date(blog.date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    blog.formattedDate = date.toLocaleDateString('en-US', options);
    return blog;
  });

  res.render('index', { title: 'Home', blogs: formattedBlogs });
});

app.get('/blog', (req, res) => {
  res.render('blog', { title: 'Blog', blogs });
});

// Dynamic route for individual blog posts
app.get('/writings/:title', (req, res) => {
  const blogTitle = req.params.title;
  const blog = blogs.find(b => {
    // For internal blog posts
    if (b.type === 'internal') {
      return b.url === `/writings/${blogTitle}`;
    }
    // For external blog posts
    return false;
  });

  if (blog) {
    if (blog.type === 'internal') {
      res.render(`blogs/${blogTitle}`, { 
        title: blog.title,
        blog: {
          ...blog,
          formattedDate: new Date(blog.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }
      });
    } else {
      // Redirect to external URL for external blog posts
      res.redirect(blog.url);
    }
  } else {
    res.status(404).send('Blog post not found');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});