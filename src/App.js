import React from 'react';
import './App.css';

let questions = [
  ['placeholder for question 0', [], []],
  ['闲暇时刻喜欢干什么？', ['A. 和朋友外出玩乐', 'B. 一个人宅在家中'], [2, 3]],
  ['跟朋友出去玩，你会选择以下？', ['A.逛街、逛展、逛公园', 'B.玩狼人、玩剧本、玩游戏', 'C.吃吃吃'], [4, 4, 4]],
  [
    '你在家喜欢如何打发时光？',
    ['A. 努力学习，认真读书', 'B. 手机电脑不离手，小说刷剧打游戏', 'C. 撸猫撸狗，撸遍“天下”'],
    [4, 4, 4]
  ],
  [
    '以下哪种旅行方式你更喜欢? ',
    ['A. 佛系度假型：我是谁，我在哪，我要干什么？不重要。', 'B. 景点打卡型：这里这里和这里，我都要去！'],
    [5, 6]
  ],
  [
    '以下哪种佛系度假你更喜欢？',
    ['A. 在度假酒店吃喝玩乐', 'B. 走哪玩哪，随心所欲'],
    [7, 7]
  ],
  [
    '以下哪种景点是你最喜欢去打卡的？',
    ['A. 自然美景', 'B. 城市风光', 'C. 主题公园'],
    [7, 7, 7]
  ],
  [
    '以下两种你会选择：',
    ['A. 可以有很多朋友天天在一起玩，但是很难交心', 'B. 可以有很少的朋友甚至只有一个，但可以交心'],
    [8, 8]
  ],
  [
    '能否接受对象有异性知己？',
    ['A. 是', 'B. 否'],
    [9, 9]
  ],
  [
    '你相信星座吗？',
    ['A. 深信不疑', 'B. 略微参考', 'C. I don’t care'],
    [10, 10, 10]
  ],
  [
    '以下三种表情包，你最常用的类型是：',
    ['A. 可爱的', 'B. 文字的', 'C. 傻X的'],
    [null, null, null]
  ],
]

function next_question(current_question, answer_num) {
  return questions[current_question][2][answer_num];
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_question: 1,
      answers: [],
      state: "start",
    }
  }

  handle_answer(ans_num) {
    let answers = this.state.answers.slice();
    answers.push({
      'question_num': this.state.current_question,
      'ans_num': ans_num,
      'ans': questions[this.state.current_question][1][ans_num],
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
          <h3>{this.state.answers.map((x) => {
            return x.question_num + ': ' + String.fromCharCode('A'.charCodeAt(0) + x.ans_num) + ', '
          })}</h3>
          <p>你就是NYU最靓的仔</p>
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
              {
                questions[this.state.current_question][1].map((ans_string, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col-sm">
                        <button type="button" className="btn btn-primary" onClick={() => { this.handle_answer(index) }}>
                          {ans_string}
                        </button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
