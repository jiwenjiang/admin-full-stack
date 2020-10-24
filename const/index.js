const genderEnum = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2,
};

const userTypeEnum = {
  PATIENT: 0,
  DOCTOR: 1,
  FAMILY: 2,
  OTHER: 3,
};

const doctorEnum = {
  CLINICAL: 0, // 临床
  THERAPEUTIST: 1, // 治疗师
  OTHER: 1, // 治疗师
  PT: 11, // 物理治疗师
  OT: 12, // 作业治疗师
};

const familyEnum = {
  FATHER: 0,
  MOTHER: 1,
  SON: 2,
  DAUGHTER: 3,
  SPOUSE: 4, // 配偶
  OTHER: 5,
};

module.exports = { genderEnum, userTypeEnum, doctorEnum, familyEnum };
