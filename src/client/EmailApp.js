import React from 'react';
import './App.css';
import {browserHistory} from "react-router";
import ReactImage from "./SecureMail.jpg";

class EmailApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.fetchEmails(props);
  }

  fetchEmails(props) {
    function mailRetrievalFailed(req) {
      props.browserHistory.push("");
      console.log('request has expired');
      req.abort();
    }

    const search = props.location.search; // could be '?token=abc'
    const params = new URLSearchParams(search);
    const token = params.get('token');
    if (token) {

      console.log(token)

      let onfulfilled = (response) => {
        if (response.ok) {
          console.log("FETCH SUCCESSFUL");
          response.json().then(data => {
            this.setState({
              emails: data
            });
          });
        } else {
          browserHistory.push("");
        }
      };
      fetch('/api/mails?token=' + token).then(onfulfilled.bind(this)).catch((error) => {
        this.setState({errors: "Wrong restore data"});
      });
    } else {
      browserHistory.push("");
    }
  }

  render() {
    let navBar = <NavBar title="SecureMail" user="vadillo.jon@gmail.com"/>;

    console.log(this.state);
    if (this.state && this.state.emails) {
      console.log("MAILS");
      console.log(this.state.emails);
      return (
        <div>
          {navBar}
          <MainContainer emails={this.state.emails}/>
        </div>
      )
    }
    return navBar;
  }
}

/**
 * Top navigation navbar containing title and username. Irrelevant for the purpose of the example.
 */
class NavBar extends React.Component {

  render() {
    //For the purpose of this exampel, the NavBar has no interation and is just JSX.
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse border-bottom">
        <img className="nav-logo" src={ReactImage} height="36"/>
        <a className="navbar-brand">{this.props.title}</a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav ml-auto">

            <li className="nav-item active">
              <a className="nav-link" href="">&nbsp;<i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="">&nbsp;<i className="fa fa-th" aria-hidden="true"></i>&nbsp;</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="">{this.props.user} <span className="sr-only">(current)</span><i
                className="fa fa-angle-down" aria-hidden="true"></i></a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

class EmailLabels extends React.Component {

  static defaultProps = {
    //Labels will be static for this example.
    labels: [{
      id: 1,
      name: 'Inbox',
      emailNumber: 4
    }, {
      id: 2,
      name: 'Drafts',
      emailNumber: 1
    }, {
      id: 3,
      name: 'Sent',
      emailNumber: 0
    }, {
      id: 4,
      name: 'Trash',
      emailNumber: 0
    }]
  };

  render() {
    return (
      <ul className="list-group">
        {/* Iterate to create labels from the props */}
        {this.props.labels.map((label) => (
          <LabelItem
            key={label.id}
            id={label.id}
            label={label}
            onClick={this.props.onLabelClick}/>
        ))}
      </ul>
    )
  }
}

class LabelItem extends React.Component {

  handleClick() {
    console.log('handleClick ' + this.props.id);
    this.props.onClick(this.props.id);
  }

  render() {
    const badgeStyle = this.props.label.emailNumber > 0 ? "badge-primary" : "";
    return (
      <li className="list-group-item justify-content-between" onClick={this.handleClick.bind(this)}>
        {this.props.label.name}
        <span className={"badge pull-right badge-pill mt-1 "+badgeStyle}>{this.props.label.emailNumber}</span>
      </li>
    )
  }
}

class Tab extends React.Component {
  render() {
    console.log(this.props.activeTab);
    // Classes to add to the <a> element
    let tabClasses = ["nav-link"];
    // Classes to add to the <i> element (the icon)
    let iconClasses = ["fa", this.props.icon];

    // Update the class array if the state is visible
    if (this.props.activeTab) {
      tabClasses.push("active");
      console.log("active");
    }

    return (
      <li className="nav-item">
        <a className={tabClasses.join(' ')} href="">
          <i className={iconClasses.join(' ')}></i>&nbsp;&nbsp;{this.props.name}
        </a>
      </li>
    )
  }
}

class EmailList extends React.Component {

  handleEmailClick = (id) => {
    this.props.onSelectedMail(id);
  };

  render() {
    return (
      <div>
        {/* Tabs created only as an example, they don't interact with the rest of the app. */}
        <ul className="nav nav-tabs">
          <Tab name="Inbox" activeTab={true} icon="fa-inbox"/>
          <Tab name="Social" activeTab={false} icon="fa-users"/>
          <Tab name="Notifications" activeTab={false} icon="fa-tags"/>
          <Tab name="Updates" activeTab={false} icon="fa-info-circle"/>
        </ul>
        <div className="list-group">
          {/* EmailItem creation: */}
          {this.props.emails.map((email) => (
            <EmailItem
              key={email.id}
              isSelected={email.id === this.props.selectedEmail}
              email={email}
              handleEmailClick={this.handleEmailClick}/>
          ))}
        </div>
      </div>
    )
  }
}

class EmailPreview extends React.Component {

  render() {
    if (this.props.email) {
      return (
        <div className="card">
          <div className="card-header">
            {this.props.email.from}
            <span className={"pull-right"}>{this.props.email.time}</span>
          </div>
          <div className="card-body">
            <h5 className="card-title">{this.props.email.subject}</h5>
            <p className="card-text" dangerouslySetInnerHTML={{__html: this.props.email.text}}></p>
          </div>
        </div>
      )
    }
    return <div></div>;
  }
}

class EmailItem extends React.Component {

  handleEmailClick() {
    //Call to the parent's method passed through properties.
    this.props.handleEmailClick(this.props.email.id);
  }

  render() {
    return (
      <li className={"list-group-item d-flex justify-content-start " + (this.props.isSelected ? "selected" : "")}
          onClick={this.handleEmailClick.bind(this)}>
        <div className="checkbox">
          <input type="checkbox"/>
        </div>

        &nbsp;&nbsp;<span className="fa fa-star-o"></span>&nbsp;&nbsp;
        <span className="name">{this.props.email.from}</span>
        <span className={"font-italic"}>{this.props.email.subject}</span>

        <span className="ml-auto p-2">
            <span className="fa fa-paperclip">&nbsp;&nbsp;</span>
            <span className="badge badge-default badge-pill">{this.props.email.time}</span>
          </span>
      </li>

    )
  }
}

class EmptyBox extends React.Component {

  render() {
    return (
      <p className="center">The email box is empty.</p>
    )
  }
}

/**
 * Main class which contains the labels and the email list.
 */
class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLabel: 1
    }
  }

  handleLabelClick(labelId) {
    console.log('Label clicked: ' + labelId);
    this.setState({
      selectedLabel: labelId,
      openedEmail: null
    });
  }

  handleOpenedEmail(id) {
    console.log('Email opened: ' + id);
    this.setState({
      openedEmail: id
    });
  }

  render() {
    const filteredEmails = this.props.emails.filter(e => e.labelId && e.labelId === this.state.selectedLabel);
    console.log(this.props.emails)
    const selectedEmail = this.props.emails.find(e => e.id && e.id === this.state.openedEmail);
    console.log("this.state.openedEmail" + this.state.openedEmail)
    console.log(selectedEmail)

    let content = null;
    if (filteredEmails.length > 0) {
      content = (
        <div>
          <EmailList emails={filteredEmails} onSelectedMail={this.handleOpenedEmail.bind(this)}
                     selectedEmail={this.state.openedEmail}/>
          <hr/>
          <EmailPreview email={selectedEmail}/></div>);
    } else {
      content = <EmptyBox/>;
    }

    return (
      <div className="container">
        <ActionsRow/>
        <hr/>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-3 col-lg-2">
            <EmailLabels onLabelClick={this.handleLabelClick.bind(this)}/>
          </div>
          <div className="col-12 col-sm-12 col-md-9 col-lg-10">
            {content}
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Come options for showing how to emulate Gmail using Bootsrap 4.
 */
class ActionsRow extends React.Component {

  render() {
    return (

      <div className="row">
        <div className="col-12 col-sm-12 col-md-3 col-lg-2">
          <a href="" className="btn btn-danger btn-primary btn-block">
            <i className="fa fa-edit"></i> Compose
          </a>
        </div>
        <div className="col-12 col-sm-12 col-md-9 col-lg-10">
          <div className="btn-group mr-1" role="group" aria-label="Button group with nested dropdown">
            <button type="button" className="btn btn-secondary">&nbsp;<i className="fa fa-refresh"
                                                                         aria-hidden="true"></i>&nbsp;</button>
            <button type="button" className="btn btn-secondary">&nbsp;<i className="fa fa-star"
                                                                         aria-hidden="true"></i>&nbsp;</button>
          </div>

          <div className="pull-right">
            <button type="button" className="btn btn-secondary mr-1">&nbsp;<i className="fa fa-cog"
                                                                              aria-hidden="true"></i>&nbsp;</button>
            <button type="button" className="btn btn-secondary">&nbsp;<i className="fa fa-bars"
                                                                         aria-hidden="true"></i>&nbsp;</button>
          </div>
        </div>
      </div>
    )
  }
}

export default EmailApp;
