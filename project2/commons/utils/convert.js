import { GenderEnum } from "../enums/gender.enum";

const Convert = {
	objectToQueryString(obj) {
		var str = [];
		for (var p in obj)
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		return str.join("&");
	},

	convertGender(number) {
		if (number !== undefined) {
			switch (number.toString()) {
				case GenderEnum.female.toString(): {
					return "Nữ";
				}
				case GenderEnum.male.toString(): {
					return "Nam";
				}
				case GenderEnum.other.toString():
					return "Khác";
			}
		}
	},

	convertImageGender(number) {
		if (number !== undefined) {
			let image;
			switch (number.toString()) {
				case GenderEnum.female.toString(): {
					image = require("../../assets/image/woman.png");
					break;
				}
				case GenderEnum.male.toString(): {
					image = require("../../assets/image/man.png");
					break;
				}
				default: {
					image = require("../../assets/image/man.png");
					break;
				}
			}

			return image;
		}
	},

	convertDepartment(DepartmentId, departments) {
        if(DepartmentId && departments && departments.length > 0){
            return departments.find((item) => item.DepartmentId === DepartmentId)
			.DepartmentName;
        }
		
	},

	convertPosition(PositionId, positions) {
        if(PositionId && positions && positions.length > 0){
            return positions.find((item) => item.PositionId === PositionId)
			.PositionName;
        }
		
	},
	broofa() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
			/[xy]/g,
			function (c) {
				var r = (Math.random() * 16) | 0,
					v = c == "x" ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			}
		);
	},
};

export default Convert;
