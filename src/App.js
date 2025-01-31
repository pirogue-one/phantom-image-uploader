import './App.css';
import FileUpload from './components/FileUpload/FileUpload';
import FileView from './components/FileView/FileView';
import Header from './components/Header/Header';
import Title from './components/Title/Title';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from 'i18nano';
import { DEFAULT_LANGUAGE, translations } from './i18n';
import { CookiesProvider, useCookies } from 'react-cookie';
import { Fragment } from 'react';

function App() {
  const [cookies] = useCookies()
  const userLang = cookies.lang || navigator.language || navigator.userLanguage // язык браузера
  const lang = userLang ? userLang.substr(0, 2) : DEFAULT_LANGUAGE

  return (
    <CookiesProvider>
      <BrowserRouter>
        <TranslationProvider
          language={lang}
          fallback={DEFAULT_LANGUAGE}
          translations={translations.main}
        >
          <div className="App">
            <Header />
            <Title />
            <div className="App-body">
              <Routes>
                <Route path="/:imageId" element={<FileView />} />
                <Route path="/uploaded/:imageId" element={<FileView owner={true}/>} />
                <Route index element={<FileUpload />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </TranslationProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App
