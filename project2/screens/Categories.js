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
      let employee = {};
    for (let i = 1000; i < 1100; i++){
        try {
            const random = Math.floor(Math.random() * categories.length);
            employee.Address = null
            employee.BankAccountNumber = null
            employee.BankBranchName = null
            employee.BankName = null
            employee.BankProvinceName = null
            employee.CreatedBy = null
            employee.CreatedDate = new Date(),
            employee.DateOfBirth = new Date(),
            employee.DepartmentCode = null
            employee.DepartmentId = categories[random].DepartmentId

            employee.DepartmentName = categories[random].DepartmentName,
            employee.EducationalBackground = null
            employee.EducationalBackgroundName = null
            employee.Email = "anhquanalpha" + i + "@gmai.com",
            employee.EmployeeCode = "MF-" + i,
            employee.EmployeeName = "Nguyễn An Quân " + (i - 999),
            employee.EmployeePosition = null
            employee.FirstName = null
            employee.Gender = Math.round(Math.random())
            employee.GenderName = null
            employee.IdentityDate = null
            employee.IdentityNumber = null
            employee.IdentityPlace = null
            employee.JoinDate = null
            employee.LastName = null
            employee.MartialStatus = null
            employee.MartialStatusName = null
            employee.ModifiedBy = null
            employee.ModifiedDate = new Date(),
            employee.PersonalTaxCode = null
            employee.PhoneNumber = "6786546"
            employee.PositionCode = null
            employee.PositionId = null
            employee.PositionName = null
            employee.QualificationId = null
            employee.QualificationName = null
            employee.Salary = null
            employee.TelephoneNumber = null
            employee.WorkStatus = null
            // var response = await axios.post(`${Config.BaseUrl}/api/v1/Employees`, employee);
          } catch (err) { 
            console.log(err);
          }
    }
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
