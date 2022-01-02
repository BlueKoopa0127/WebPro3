import { useEffect, useState } from "react";
import { getValue } from "./api";

const VISIT = 'count';
const A = 'A', B = 'B', C = 'C';

function App() {
    return ( 
        <main>
            <Header />
            <div className="mx-5">
                <HowTo />
                <div className="columns">
                    <div className="column has-text-centered"><Click name={A} /></div>
                    <div className="column has-text-centered"><Click name={B} /></div>
                    <div className="column has-text-centered"><Click name={C} /></div>
                </div>
                <div className="has-text-centered"><Visit /></div>
            </div>
            <Footer />
        </main>
    );
}

function HowTo() {
    return (
        <main>
            <h2 className="breadcrumb is-large m-0 has-text-weight-bold">使い方</h2>
            <p>使い方は簡単。ABCどれかのボタンをクリックするだけ。クリックするとそのボタンが今までに押された回数が出るから一番押されているボタンや一番押されてないボタンを予想してみよう！</p>
        </main>
    );
}

function Visit() {
    const [count, setCount] = useState(null);

    useEffect(async () => {
        const result = await getValue(VISIT);
        setCount(result);
    }, []);

    if(count == null) {
        return (
            <p>このページは-回表示されました！ありがとう！</p>
        );
    }

    return (
        <p>このページは{count}回表示されました！ありがとう！</p>
    );
}

function Click(props) {
    const [clickCount, setCount] = useState(null);

    const clickEvent = async () => {
        const result = await getValue(`click${props.name}`);
        setCount(result);
    };

    if(clickCount == null) {
        return (
            <main>
                <p className="breadcrumb is-large m-0">???</p>
                <button onClick={clickEvent} className="button is-large">{props.name}</button>
            </main>
        );
    }

    return (
        <main>
            <p className="breadcrumb is-large m-0">{clickCount}</p>
            <button onClick={clickEvent} className="button is-large">{props.name}</button>
        </main>
    );
}

function Header() {
    return (
      <header className="hero is-light is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Click Counter</h1>
          </div>
        </div>
      </header>
    );
}

function Footer() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
            <p>このWebページは日本大学文理学部情報科学科 Webプログラミングの演習課題です。</p>
            <p>学生証番号：5420071 氏名：塚田一晃</p>
          <p>Count is retrieved from CountAPI</p>
          <p>
            <a href="https://countapi.xyz/">Donate to CountAPI</a>
          </p>
        </div>
      </footer>
    );
}

export default App;