import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Topics from './components/Topics';
import ArticlesList from './pages/ArticlesList';
import Article from './pages/Article';
import ArticlePoster from './components/ArticlePoster';
import ErrorDisplayer from './components/ErrorDisplayer';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const App = () => {
  return (
    <AppContainer>
      <Header />
      <Topics />
      <Router>
        <ArticlesList path="/" />
        <ArticlesList path="/topics/:slug" />
        <Article path="/articles/:article_id" />
        <ArticlePoster path="/submit-article" />
        <ErrorDisplayer default msg="Page does not exist" status="404" />
      </Router>
      <Footer />
    </AppContainer>
  );
};

export default App;
