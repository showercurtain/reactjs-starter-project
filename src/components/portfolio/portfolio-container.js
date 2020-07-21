import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      data: [],
      filtered: []
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    if (filter === "CLEAR_FILTERS"){
      this.setState({
        filtered: this.state.data
      })
    } else {
      this.setState({
        filtered: this.state.data.filter(item => {
          return item.category === filter;
        })
      });
    }
  }

  getPortfolioItems() {
    axios
      .get("https://seancowley.devcamp.space/portfolio/portfolio_items")
      .then(response => {
        this.setState({
          data: response.data.portfolio_items,
          filtered: response.data.portfolio_items
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  portfolioItems() {
    return this.state.filtered.map(item => {
      return <PortfolioItem key={item.id} item={item} />;
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  filterButtons() {
    var items = [];
    for (var i = 0; i < this.state.data.length; i++) {
      if (!items.includes(this.state.data[i].category)) {
        items.push(this.state.data[i].category);
      }
    }
    var buttons = items.map(category => {
      return <button className="btn" key={category} onClick={() => this.handleFilter(category)}>{category}</button>
    })
    buttons.push(
      <button className="btn" key="ClearFilters" onClick={() => this.handleFilter("CLEAR_FILTERS")}>All</button>
    )
    return buttons;
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="filter-links">
          {this.filterButtons()}
        </div>
        <div className="portfolio-items-wrapper">
          {this.portfolioItems()}
        </div>
      </div>
    );
  }
}
