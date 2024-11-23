const express = require('express');
const app = express();





app.use(express.static('public'));

// Sample blog data
const blogs = [
  {
    url: 'https://prove.email/blog/recovery',
    title: 'Email-Based Account Recovery using ZK Email and Rhinestone',
    date: '2024-06-26',
    excerpt: 'This blog post explains the importance of zk email-based account recovery modules, and how to use it for any smart contract in collaboration with Rhinestone.',
    category: 'Cryptography',
    type: 'external'
  },
  {
    url: 'https://prove.email/blog/ethDenverNFT',
    title: 'Send and Receive NFTs using Email wallet',
    date: '2024-02-20',
    excerpt: "Use this guide to claim your EthDenver NFT using Email Wallet, learn how to send any NFT via emails, and integrate your own email-based NFTs into your app.",
    category: 'Cryptography',
    type: 'external'
  },
  {
    url: 'https://prove.email/blog/twitter',
    title: 'Building Proof of Twitter using ZK Email',
    date: '2024-01-15',
    excerpt: "This tutorial guides you through creating a Twitter circom circuit using ZK Email's libraries.",
    category: 'Cryptography',
    type: 'external'
  },
  {
    url: 'https://medium.com/@metachaser/why-cant-i-buy-gum-with-crypto-15182623254a',
    title: "Why Can't I Buy Gum With Crypto",
    date: '2023-10-26',
    excerpt: 'An in-depth look at the obstacles preventing crypto from being used for everyday transactions',
    category: 'Think Pieces',
    type: 'external'
  },
  {
    url: './writings/the-global-majority',
    title: "The Global Majority",
    date: '2024-11-22',
    excerpt: 'Reframing the world\'s 85% population from "minorities" to their true identity as the Global Majority, and how Ethereum can empower this transformation.',
    category: 'Think Pieces',
    type: 'internal'
  }

];

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
  const blogTitle = req.params.title; // Keep the title as is
  console.log(`Looking for blog title: ${blogTitle}`); // Debug log

  // Log all blog titles for debugging
  blogs.forEach(b => console.log(`Available blog title: ${b.title}`));

  const blog = blogs.find(b => b.title.toLowerCase().replace(/ /g, '-') === blogTitle.toLowerCase());

  if (blog) {
    console.log(`Found blog: ${blog.title}`); // Debug log
    res.render(`blogs/${blog.title.toLowerCase().replace(/ /g, '-')}`, { title: blog.title, blog });
  } else {
    console.log('Blog post not found'); // Debug log
    res.status(404).send('Blog post not found');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});