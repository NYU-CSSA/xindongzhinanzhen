import React from 'react';
import './App.css';

let questions = [
  ['三个答案你随便选一个吧', 'A', 1, 'B', 2, 'C', 3],
  ['question 1', 'A', 4, 'B', 4, 'C', 4],
  ['question 2', 'A', 4, 'B', 4, 'C', 4],
  ['question 3', 'A', 4, 'B', 4, 'C', 4],
  ['question 4', 'A', 5, 'B', 6, 'C', 7],
  ['question 5', 'A', 8, 'B', 8, 'C', 8],
  ['question 6', 'A', 8, 'B', 8, 'C', 8],
  ['question 7', 'A', 8, 'B', 8, 'C', 8],
  ['question 8', 'A', null, 'B', null, 'C', null],
]

function next_question(current_question, answer_num) {
  return questions[current_question][2 * answer_num + 2];
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_question: 0,
      answers: {},
      state: "start",
    }
  }

  handle_answer(ans_num) {
    let answers = this.state.answers;
    answers[this.state.current_question] = ans_num;
    let next_ques = next_question(this.state.current_question, ans_num);
    if (next_ques === null) {
      this.setState({
        answers: answers,
        state: "finished",
      })
    } else {
      this.setState({
        answers: answers,
        current_question: next_ques,
      })
    }
    console.log(answers)
  }

  render() {
    if (this.state.state === "start") {
      return (
        <div className="container test-start">
          <h1>XX测试</h1>
          <h2>快点按钮开始测试吧</h2>
          <button type="button" className="btn btn-primary" onClick={() => { this.setState({ state: "testing" }) }}>快让我开始测试啊</button>
        </div>
      )
    }
    else if (this.state.state === "finished") {
      return (
        <div className="container test-result">
          <h1>测试结果</h1>
          <h2>你就是NYU最靓的仔吧</h2>
          <p>别试了就这一个测试结果</p>
          <img width="100px" alt="" src={process.env.PUBLIC_URL + "/qrcode.png"} />
        </div>
      )
    }
    return (
      <div className="container">
        {/* <div className="card" style={{"width": "18rem"}}> */}
        <div className="card question">
          <div className="card-body">
            <h5 className="card-title">{questions[this.state.current_question][0]}</h5>
            <p className="card-text">这里有一些问题描述不知道说些什么好如果你不需要这个问题描述那我也可以把它关掉。</p>
          </div>
        </div>
        <div className="answers">
          <div className="row">
            <div className="col-sm">
              <button type="button" className="btn btn-primary" onClick={() => { this.handle_answer(0) }}>A. AAAAAAAAAAAAAAAAAAAA</button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <button type="button" className="btn btn-primary" onClick={() => { this.handle_answer(1) }}>B. BBBBBBBBBBBBBBBBBB</button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <button type="button" className="btn btn-primary" onClick={() => { this.handle_answer(2) }}>C. CCCCCCC</button>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
