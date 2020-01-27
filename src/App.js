import React from 'react';
import './App.css';

let questions = [
  ['你更倾向于是', '肉食主义者', 1, '素食主义者', 2, '均衡饮食者', 3],
  ['以下食物你更喜欢哪种', '炸鸡🍗', 4, '烤肉🍖', 4, '火锅🍲', 4],
  ['以下食物你更喜欢哪种', '炒菜🥦', 4, '麻辣烫🍲', 4, '沙拉🥗', 4],
  ['以下食物你更喜欢哪种', '米饭🍚', 4, '面食🍜', 4, '都差不多', 4],
  ['以下三款冰淇淋，你更喜欢', '香草🌿', null, '巧克力🍫', null, '草莓🍓', null],
]

function next_question(current_question, answer_num) {
  return questions[current_question][2 * answer_num + 2];
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_question: 0,
      answers: [],
      state: "start",
    }
  }

  handle_answer(ans_num) {
    let answers = this.state.answers.slice();
    answers.push({
      'question_num': this.state.current_question,
      'ans_num': ans_num,
      'ans': questions[this.state.current_question][ans_num * 2 + 1],
    });
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
    // console.log(answers)
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
          <h3>你是一个喜欢吃{this.state.answers[1]['ans']}和{this.state.answers[2]['ans']}冰淇淋的{this.state.answers[0]['ans']}</h3>
          <p>不准你打我</p>
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
            {/* <p className="card-text">这里有一些问题描述不知道说些什么好如果你不需要这个问题描述那我也可以把它关掉。</p> */}
            <div className="answers">
              <div className="row">
                <div className="col-sm">
                  <button type="button" className="btn btn-primary" onClick={() => { this.handle_answer(0) }}>
                    {questions[this.state.current_question][1]}
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <button type="button" className="btn btn-primary" onClick={() => { this.handle_answer(1) }}>
                    {questions[this.state.current_question][3]}
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <button type="button" className="btn btn-primary" onClick={() => { this.handle_answer(2) }}>
                    {questions[this.state.current_question][5]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
