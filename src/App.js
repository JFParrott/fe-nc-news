import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Topics from './components/Topics';
import ArticlesList from './pages/ArticlesList';
import Article from './pages/Article';
import ArticlePoster from './components/ArticlePoster';

class App extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Header />
        <Topics />
        <Router>
          <ArticlesList path="/" />
          <ArticlesList path={`/:slug`} />
          <Article path={`/:slug/:article_id`} />
          <ArticlePoster path="/submit-article" />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
