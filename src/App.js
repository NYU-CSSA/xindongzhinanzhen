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
    [7, 7, 7],
    ['6a.png', '6b.png', '6c.png']
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
    [null, null, null],
    ['10a.gif', '10b.png', '10c.gif']
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
      rejected: false,
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
        state: "invitation",
      })
    } else {
      this.setState({
        answers: answers,
        current_question: next_ques,
      })
    }
    // console.log(answers)
  }

  render_ans(ans_string, index) {
    let this_question = questions[this.state.current_question];
    return (
      <div className="row" key={index}>
        <div className="col-sm">
          <button type="button" className="btn btn-primary" onClick={() => { this.handle_answer(index) }}>
            {ans_string}
            {this_question.length >= 4 ? (
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/images/" + this_question[3][index]}
                  width="50%"
                  alt=''
                />
              </div>
            ) : ''}
          </button>
        </div>
      </div>
    )
  }

  render_invitation() {
    return (
      <div className="invitation">
        <div className="container">
          {/* <div className="card" style={{"width": "18rem"}}> */}
          <div className="card question">
            <div className="card-body">
              <h5 className="card-title">{this.state.rejected ? "XXX活动！" : "查看结果之前要不要报名个活动！"}</h5>
              <p className="card-text">NYUCSSA将于2.15-2.22进行为期一周的线上群聊活动。我们会根据您对以上问题的回答，将您匹配进4-6人的微信群组。通过积极完成一周群任务，您将有机会和队友在现实生活中见面，一起参与2.23晚的线下悬疑活动，并获得精美礼品。请问您是否愿意参与这次活动呢？（由于本次活动人数有限，主办方不能保证百分之百匹配成功。一旦匹配成功，工作人员将于2月14日联系您）</p>
              <div className="answers">
                <button type="button" className="btn btn-primary" onClick={() => { this.setState({ rejected: false, state: 'form' }) }}>愿意，现在就报名</button>
                <button type="button" className="btn btn-primary" onClick={() => { this.setState({ rejected: true, state: 'finished' }) }}>先看结果再说</button>
              </div>
            </div>
          </div>
        </div >
      </div >
    )
  }

  render_start() {
    return (
      <div className="container test-start">
        <h1>XX测试</h1>
        <h2>快点按钮开始测试吧</h2>
        <button type="button" className="btn btn-primary" onClick={() => { this.setState({ state: "testing" }) }}>快让我开始测试啊</button>
      </div>
    )
  }

  render_finished() {
    return (
      <div className="container test-result">
        <h1>测试结果</h1>
        <h3>{this.state.answers.map((x) => {
          return x.question_num + ': ' + String.fromCharCode('A'.charCodeAt(0) + x.ans_num) + ', '
        })}</h3>
        <p>你就是NYU最靓的仔</p>
        <img width="100px" alt="" src={process.env.PUBLIC_URL + "/qrcode.png"} />
        <br />
        {this.state.rejected ?
          <button type="button" className="btn btn-primary" onClick={() => { this.setState({ state: 'invitation' }) }}>报名参加活动</button>
          : ''}
      </div>
    )
  }

  render_question() {
    return (
      <div className="container">
        {/* <div className="card" style={{"width": "18rem"}}> */}
        <div className="card question">
          <div className="card-body">
            <h5 className="card-title">{questions[this.state.current_question][0]}</h5>
            {/* <p className="card-text">这里有一些问题描述不知道说些什么好如果你不需要这个问题描述那我也可以把它关掉。</p> */}
            <div className="answers">
              {
                questions[this.state.current_question][1].map(this.render_ans.bind(this))
              }
            </div>
          </div>
        </div>
      </div >
    );
  }

  render_form() {
    return (
      <div>
        中文姓名<input type="text" name="name" /><br />
        性别<input type="text" name="sex" /><br />
        微信号<input type="text" name="wechat" /><br />
        <button onClick={() => { alert('报名成功！'); this.setState({ state: 'finished' }) }}>提交</button>
      </div>
    )
  }

  render() {
    if (this.state.state === "start") {
      return this.render_start();
    }
    else if (this.state.state === "finished") {
      return this.render_finished();
    }
    else if (this.state.state === "testing") {
      return this.render_question();
    }
    else if (this.state.state === "invitation") {
      return this.render_invitation();
    } else {
      return this.render_form();
    }
  }
}

export default App;
