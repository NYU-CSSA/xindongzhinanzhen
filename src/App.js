import React from 'react';
import './App.css';

let questions = [
  ['placeholder for question 0', [], []],
  ['我经常出没在：', ['A. Bobst', 'B. Ktown', 'C. 中国城', 'D. 法拉盛', 'E. Soho', 'F. 家里'], [2, 2, 2, 2, 2, 2]],
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
    ['A. 周边城市游', 'B. 异国流浪', 'C. 留守纽约'],
    [7, 7, 8]
  ],
  [
    '以下哪种景点是我最喜欢去打卡的？',
    ['', '', '', ''],
    [8, 8, 8, 8],
    ['7a.png', '7b1.png', '7c.png', '7d.png']
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
      name: '',
      email: '',
      sex: '',
      wechat: '',
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
        <div className="ans-btn-group">
          <button type="button" className="btn answer-button" onClick={() => { this.handle_answer(index) }}>
            {ans_string}
            {this_question.length >= 4 ? (
              <div className="image-div">
                <img
                  src={process.env.PUBLIC_URL + "/images/" + this_question[3][index]}
                  width="90%"
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
          <div className="card invitation">
            <div className="card-body">
              <div className="invitation-title">
                <p className="card-title invitation-title">心动指南针</p>
                <p className="invitation-subtitle">找到你在NYU兴趣相同的好朋友</p>
              </div>
              <div className="invitation-text">
                <p className="card-text">NYUCSSA 诚意推出全新线上活动 2.15-2.22 【心动指南针】！
                我们将根据您本次的测试结果，为您匹配到4-6人的微信群。通过积极完成一周群任务，您将结交更多有趣的小伙伴，并有机会和朋友们面基、一起参与我们线下悬疑活动【铭心大侦探】，赢得精美奖品。
                本次活动人数有限，赶快抓紧时间报名吧！
                让我们在这个春天，摘下心灵的口罩，遇到彼此吧～
                </p>
                <p className="invitation-note">注：若匹配成功，工作人员将于2月14日联系您</p>
              </div>
              <div className="answers">
                <button type="button" className="btn btn-primary inv-btn" onClick={() => { this.setState({ rejected: false, state: 'form' }) }}>立即报名</button>
                <button type="button" className="btn btn-primary inv-btn" onClick={() => { this.setState({ rejected: true, state: 'finished' }) }}>先看结果再说</button>
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
        <h2>测测你的</h2>
        <h1>NYU称号</h1>
        <button type="button" className="btn start-btn" onClick={() => { this.setState({ state: "testing" }) }}>开始测试</button>
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
      case 0: my_title += get_random_of('萌物/小奶娃/宝贝'); break;
      case 1: my_title += get_random_of('大佬/老板/总裁/一哥'); break;
      case 2: my_title += get_random_of('沙雕/尤物'); break;
      default:
        console.log(answers_map);
    }

    return my_title;
  }

  send_result() {

    if (this.state.name === '' || this.state.email === '' || this.state.sex === '' || this.state.wechat === '') {
      alert("请正确填写所有信息");
      return;
    }
    if (!this.state.email.endsWith('@nyu.edu')) {
      alert("仅限NYU学生参加，请使用NYU邮箱");
      return;
    }

    let answers_map = {};
    for (let i in this.state.answers) {
      let answer = this.state.answers[i];
      answers_map[answer['question_num']] = answer['ans_num'];
    }
    for (let i in questions) {
      if (!(i in answers_map)) {
        answers_map[i] = -1;
      }
    }

    answers_map['name'] = this.state.name;
    answers_map['email'] = this.state.email;
    answers_map['sex'] = this.state.sex;
    answers_map['wechat'] = this.state.wechat;


    let result = JSON.stringify(answers_map);
    console.log(result);

    var xhr0 = new XMLHttpRequest();
    xhr0.addEventListener('load', () => {
      console.log(xhr0.responseText);
      if (xhr0.responseText.includes("already registered")) {
        alert("您的邮箱已经报名过了!");
      } else {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
          console.log(xhr.responseText);
          alert("报名成功！请等待CSSA工作人员联系~")
        })
        console.log((result));
        xhr.open('GET', 'https://www.cssanyu.org/2020/questionnaire.php?data=' + encodeURIComponent(result));
        // xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
        // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.send();
      }
    })
    xhr0.open('GET', 'https://www.cssanyu.org/2020/check_exist.php?data=' + encodeURIComponent(result));
    // xhr0.setRequestHeader('Access-Control-Allow-Headers', '*');
    // xhr0.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr0.send();

    this.setState({ state: 'finished' });
  }

  render_finished() {
    return (
      <div className="container test-result">
        <h3>我的NYU称号：</h3>
        <h1 className="mytitle">
          {this.generate_title()}
        </h1>
        {/* <p>({this.state.answers.map((x) => {
          return x.question_num + ': ' + String.fromCharCode('A'.charCodeAt(0) + x.ans_num) + ', '
        })})</p> */}
        {this.state.rejected ?
          <button type="button" className="btn btn-primary" onClick={() => { this.setState({ state: 'invitation' }) }}>报名参加『心动指南针』</button>
          : ''}
        <br />
        <img width="120px" alt="" src={process.env.PUBLIC_URL + "/test-qrcode.png"} />
        <p className="screenshot-text">截图至朋友圈<br />扫码一起来测"我的NYU称号"</p>
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
      <div className="container form">
        <h1>
          心动指南针
        </h1>
        <h5>报名表</h5>
        <form>
          <div className="form-group">
            <label htmlFor="email">邮箱（每个NYU邮箱仅能测试一次哦～）</label>
            <input type="email" className="form-control" name="email" placeholder='email' onChange={(e) => { this.setState({ email: e.target.value }) }} />
          </div>
          <div className="form-group">
            <label htmlFor="name">昵称</label>
            <input type="text" className="form-control" name="name" placeholder='name' onChange={(e) => { this.setState({ name: e.target.value }) }} />
          </div>
        </form>
        <div className="form-group">
          <label htmlFor="sex">性别</label>
          <select id="sex" className="form-control" defaultValue="" onChange={(e) => { this.setState({ sex: e.target.value }) }} >
            <option value="" disabled hidden>请选择</option>
            <option value="male">男</option>
            <option value="female">女</option>
            <option value="notsay">我不想说</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="wechat">微信号</label>
          <input type="text" name="wechat" placeholder="wechat id" className="form-control" onChange={(e) => { this.setState({ wechat: e.target.value }) }} />
        </div>
        <button className='btn' onClick={() => { this.send_result(true) }}>提交</button>
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
