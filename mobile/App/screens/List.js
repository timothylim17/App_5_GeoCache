import React from "react";
import { ActivityIndicator } from "react-native";

import { List, ListItem } from "../components/List";
import { geoFetch } from "../util/api";

class ListScreen extends React.Component {
  state = {
    loading: true,
    list: [],
    refreshing: false,
  };

  componentDidMount() {
    this.getGeoFetch();
  }

  getGeoFetch = () => {
    geoFetch("/geocache/list")
      .then((response) => {
        this.setState({
          loading: false,
          list: response.result,
          refreshing: false,
        });
      })
      .catch((error) => {
        console.log("list error:", error);
      });
  };

  handleRefresh = () => {
    const { list } = this.state;
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getGeoFetch();
      }
    );
  };

  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <List
        data={this.state.list}
        renderItem={({ item, index }) => (
          <ListItem
            title={item.title}
            isOdd={index % 2}
            onPress={() => this.props.navigation.navigate("Details", { item })}
          />
        )}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
      />
    );
  }
}

export default ListScreen;
