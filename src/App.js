import React from 'react';
import './App.css';

let questions = [
  ['placeholder for question 0', [], []],
  ['我经常出没在——', ['A. Bobst', 'B. Ktown', 'C. 中国城', 'D. 法拉盛', 'E. Soho', 'F. 家里'], [2, 2, 2, 2, 2, 2]],
  ['周末当然要：', ['A. 和朋友浪浪浪', 'B.一个人肥宅快乐'], [3, 4]],
  [
    '跟朋友出去玩，你会选择以下？',
    ['A. 压马路，艺术展，逛逛逛', 'B. 狼人杀、剧本杀，杀杀杀', 'C. 吃吃吃，喝喝喝，蹦蹦蹦'],
    [5, 5, 5]
  ],
  [
    '肥宅快乐的方式：',
    ['A. 沉迷读书无法自拔', 'B. 小说网剧Netflix', 'C. 屠龙宝刀，原地游戏'],
    [5, 5, 5]
  ],
  [
    '嘴里当然要有点：',
    ['A. 奶茶', 'B. 咖啡', 'C. 果汁', 'D. 空气'],
    [6, 6, 6, 6]
  ],
  [
    '感恩节和春假我选择',
    ['A. 佛系度假', 'B. 异国流浪', 'C. 留守纽约'],
    [7, 7, 8]
  ],
  [
    '以下哪种景点是我最喜欢去打卡的？',
    ['A.', 'B.', 'C.', 'D.'],
    [8, 8, 8, 8],
    ['7a.png', '7b.png', '7c.png', '7d.png']
  ],
  [
    '我的朋友都是：',
    ['A. 没有感情撩遍天下的交友机器', 'B. 为我两肋插刀的好基友'],
    [9, 9]
  ],
  [
    '星座这个东西：',
    ['A. 了如指掌', 'B. 随便看看', 'C. 与我无瓜'],
    [10, 10, 10]
  ],
  [
    '我的表情差不多都是：',
    ['A. 可爱的', 'B. 文字的', 'C. 傻X的'],
    [null, null, null],
    ['10a.gif', '10b.png', '10c.gif']
  ],
]

function next_question(current_question, answer_num) {
  return questions[current_question][2][answer_num];
}

function get_random_of(slash_separated_string) {
  let items = slash_separated_string.split('/');
  return items[Math.floor((Math.random() * items.length))];
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
                  width="70%"
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

  generate_title() {
    let answers_map = {};
    for (let i in this.state.answers) {
      let answer = this.state.answers[i];
      answers_map[answer['question_num']] = answer;
    }
    // console.log(answers_map);
    let my_title = get_random_of('盘踞/占领/聚居/扎根');
    my_title += answers_map[1]['ans'].split(' ')[1];
    // 3A精致生活 3B脑力社交 3C囤积脂肪 3D咚次哒次 4A GPA4.0 4B长期咸鱼 4C沉迷游戏
    if (3 in answers_map) {
      switch (answers_map[3]['ans_num']) {
        case 0: my_title += '精致生活'; break;
        case 1: my_title += '脑力社交'; break;
        case 2: my_title += '囤积脂肪'; break;
        case 3: my_title += '咚次哒次'; break;
        default:
          console.log(answers_map);
      }
    } else if (4 in answers_map) {
      switch (answers_map[4]['ans_num']) {
        case 0: my_title += 'GPA4.0'; break;
        case 1: my_title += '长期咸鱼'; break;
        case 2: my_title += '沉迷游戏'; break;
        default:
          console.log(answers_map);
      }
    } else {
      console.log(answers_map);
    }
    my_title += '的';
    switch (answers_map[5]['ans_num']) {
      case 0: my_title += '波霸'; break;
      case 1: my_title += '中毒'; break;
      case 2: my_title += '健康'; break;
      case 3: my_title += '养生'; break;
      default:
        console.log(answers_map);
    }
    switch (answers_map[10]['ans_num']) {
      case 0: my_title += get_random_of('萌物/弟弟/女孩/男孩'); break;
      case 1: my_title += get_random_of('大佬/老板/总裁/一哥/一姐'); break;
      case 2: my_title += get_random_of('男子/女子/沙雕/尤物/小伙'); break;
      default:
        console.log(answers_map);
    }

    return my_title;
  }

  render_finished() {
    return (
      <div className="container test-result">
        <h3>我的NYU称号：</h3>
        <h1>
          {this.generate_title()}
        </h1>
        <p>({this.state.answers.map((x) => {
          return x.question_num + ': ' + String.fromCharCode('A'.charCodeAt(0) + x.ans_num) + ', '
        })})</p>
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
