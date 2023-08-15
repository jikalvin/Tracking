import React from "react";
import "./Product1.css"
import getDistance from "../../utils/distance";

class Card extends React.Component {
    render() {
      return (<div className="card">{this.props.children}</div>)
    }
  }
  
  class SelectableCard extends React.Component {
  
    render() {
      var isSelected = this.props.selected ? "selected" : "";
      var className = "selectable " + isSelected;
      return (
        <Card>
          <div className={className} onClick={this.props.onClick}>
            {this.props.children}
            <div className="check"><span className="checkmark">✔</span></div>
          </div>
        </Card>
      );
    }
  }
  
  class SelectableTitleCard extends React.Component {
  
    render() {
      var {
        title,
        description,
        selected
      } = this.props;
      return (
        <SelectableCard onClick={this.props.onClick}
          selected={selected}>
          <div className="content">
            <h1 className="title">{title}</h1>
            <p className="description">{description}</p>
          </div>
        </SelectableCard>
      );
    }
  }
  
  class SelectableCardList extends React.Component {
  
    constructor(props) {
      super(props);
      var selected = props.multiple ? [] : -1;
      var initialState = {
        selected: selected
      };
      this.state = initialState;
    }
  
    onItemSelected(index) {
      this.setState((prevState, props) => {
        if (props.multiple) {
          var selectedIndexes = prevState.selected;
          var selectedIndex = selectedIndexes.indexOf(index);
          if (selectedIndex > -1) {
            selectedIndexes.splice(selectedIndex, 1);
            props.onChange(selectedIndexes);
          } else {
            if (!(selectedIndexes.length >= props.maxSelectable)) {
              selectedIndexes.push(index);
              props.onChange(selectedIndexes);
            }
          }
          return {
            selected: selectedIndexes
          };
        } else {
          props.onChange(index);
          return {
            selected: index
          }
        }
      });
    }
  
    render() {
      var {
        contents,
        multiple
      } = this.props;
  
      var content = contents.map((cardContent, i) => {
        var {
          title,
          description,
          selected
        } = cardContent;
        var selected = multiple ? this.state.selected.indexOf(i) > -1 : this.state.selected == i;
        return (
          <SelectableTitleCard key={i} 
            title={title} description={description}
            selected={selected} 
            onClick={(e) => this.onItemSelected(i)} />
        );
      });
      return (<div className="cardlist">{content}</div>);
    }
  }
  
  class Example extends React.Component {
    onListChanged(selected) {
      this.setState({
        selected: selected
      });
    }
    submit() {
      window.alert("Selected: " + this.state.selected);
    }
    render() {
      return (
        <div className="column">
            <h1 className="title">{this.props.title}</h1>
            <SelectableCardList 
              multiple={this.props.multiple}
              maxSelectable={this.props.maxSelectable}
              contents={this.props.cardContents}
              onChange={this.onListChanged.bind(this)}/>
        </div>);
    }
  }
  
  
  var teams = [{
    title: "FC Barcelona",
    description: "Spain"
  }, {
    title: "Real Madrid",
    description: "Spain"
  }, {
    title: "Bayern Munich",
    description: "Germany"
  }, {
    title: "Juventus",
    description: "Italy"
  }];
  
  var genres = [{
    title: "Google",
    description: "Mountain View, CA"
  }, {
    title: "Apple",
    description: "Cupertino, CA"
  }, {
    title: "Microsoft",
    description: "Redmond, WA"
  }, {
    title: "Facebook",
    description: "Menlo Park, CA"
  }];
  
  class Product1 extends React.Component {
    
    render() {
        var bkgs = this.props.booking;
        console.log(bkgs)
        var teams = [{
            title: "Type",
            description: bkgs.typeShipment
          }, {
            title: "Packages",
            description: bkgs.packages
          }, {
            title: "Product",
            description: bkgs.product
          }, {
            title: "Delivery Date",
            description: bkgs.DDate
          }];

          var team2 = [{
            title: "Sender's Name",
            description: bkgs.SFName
          }, {
            title: "Sender's Phone",
            description: bkgs.SPhone
          }, {
            title: "Address",
            description: bkgs.SAddress
          }, {
            title: "Distance Left",
            description: getDistance(bkgs.origin, bkgs.destination)
          }];
      return (
        <div>
          <Example title="" cardContents={teams} />
          <Example title="" cardContents={team2} multiple maxSelectable={3} />
        </div>
      );
    }
  }

export default Product1