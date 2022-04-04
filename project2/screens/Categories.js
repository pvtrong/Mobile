import React from 'react';
import CategoryListItem from '../components/CategoryListItem';
import { FlatList } from 'react-native';
import axios from 'axios';
import { Config } from "../config/config";

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
      ],
    };
  }

  async componentDidMount() {
    try {
      var res = await axios.get(`${Config.BaseUrl}/api/v1/Departments`);
      const categories = res.data;
      this.setState({ categories });
    } catch (err) { 
      console.log(err);
    }
  }
  render() {
    const { navigation } = this.props;
    const { categories } = this.state;
    return (
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryListItem
            category={item}
            onPress={() => navigation.navigate('Category', {name: item.DepartmentName, departmentId: item.DepartmentId})}
          />
        )}
        keyExtractor={(item) => `${item.DepartmentId}`}
        contentContainerStyle={{
          paddingLeft: 16,
          paddingRight: 16,
        }}></FlatList>
    );
  }
}
