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
  },
  {
    url: './writings/beyond-the-code',
    title: "Beyond the Code: Building Trust in Zero Knowledge Systems",
    date: '2024-12-21',
    excerpt: 'Exploring how a decentralized network of developers can bridge the gap between complex ZK protocols and non-technical users through collaborative validation and consensus.',
    category: 'Cryptography',
    type: 'internal'
  }

];

const projects = [
  {
    name: 'Canopi',
    tagline: 'AI lead gen & outreach assistant for small business owners',
    description: 'An AI-powered assistant that helps small business owners discover qualified leads and run personalized outreach at scale, so founders can stay focused on building and serving customers.',
    tags: ['AI', 'Lead Gen', 'SMB'],
    status: 'Live',
    url: 'https://getcanopi.ai'
  },
  {
    name: 'Cr3dentials',
    tagline: 'Verification infrastructure for financial institutions',
    description: 'Helps lenders verify the identity and income of alternative earners like gig workers, freelancers, and merchants using real-time data pulled directly from platform dashboards.',
    tags: ['Fintech', 'Identity', 'Verification'],
    status: 'Active',
    url: 'https://www.cr3dentials.xyz'
  },
  {
    name: 'Church Onchain',
    tagline: 'Decentralized donations & treasury management for churches',
    description: 'Infrastructure that lets churches handle donations and treasury management through a transparent decentralized autonomous organization, giving congregations visibility into how funds are stewarded.',
    tags: ['Crypto', 'DAO', 'Treasury'],
    status: 'Archived',
    url: ''
  },
  {
    name: 'Caracal',
    tagline: 'Ecommerce for high heel dance shoes',
    description: 'A boutique ecommerce experience designed for dancers, focused on high heel dance shoes with a storefront tailored to the community it serves.',
    tags: ['Ecommerce', 'Brand'],
    status: 'Live',
    url: 'https://caracal.world'
  },
  {
    name: 'CourtIQ',
    tagline: 'AI sports betting agent for basketball & baseball parlays',
    description: 'An AI agent built in 2024 that analyzes matchups and player data to help bettors make sharper picks for parlays and props across basketball and baseball.',
    tags: ['AI', 'Sports', 'Agents'],
    status: 'Archived · 2024',
    url: ''
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

app.get('/portfolio', (req, res) => {
  res.render('portfolio', { title: 'Portfolio', projects });
});

// Dynamic route for individual blog posts
app.get('/writings/:title', (req, res) => {
  const blogTitle = req.params.title;
  console.log(`Looking for blog title: ${blogTitle}`);

  const blog = blogs.find(b => {
    const urlPath = b.url.split('/').pop();
    return urlPath.toLowerCase() === blogTitle.toLowerCase();
  });

  if (blog) {
    // Convert the blog title to a view path format
    const viewPath = `blogs/${blogTitle}`;
    console.log(`Attempting to render view: ${viewPath}`);
    res.render(viewPath, { title: blog.title, blog });
  } else {
    console.log('Blog post not found');
    res.status(404).send('Blog post not found');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});