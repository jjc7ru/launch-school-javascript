// (1) The code below is expected to output the following when run:
//     > helloVictor = createGreeter('Victor');
//     > helloVictor.greet('morning');
//     = Good Morning Victor
//     However, it instead results in an error. What is the problem with the code? 
//     Why isn't it producing the expected results?

function createGreeter(name) {
  return {
    name: name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet: function(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }
      console.log(msg);
    },
  };
}

let helloVictor = createGreeter('Victor');
helloVictor.greet('afternoon');

// (2) A grocery store uses a JavaScript function to calculate discounts on various 
//     items. They are testing out various percentage discounts but are getting unexpected 
//     results. Go over the code, and identify the reason why they aren't getting the expected 
//     discounted prices from the function. Then, modify the code so that it produces the correct results.
let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(item, percent) {
    let discount = item.price * percent / 100;
    return item.price - discount;
  },
};

console.log(item.discount(item, 20))   // should return 40
console.log(item.discount(item, 50))   // should return 25
console.log(item.discount(item, 25))   // should return 37.5

// (3) In JavaScript, comparing two objects either with == or === checks for object 
//     identity. In other words, the comparison evaluates as true if it's the same object 
//     on either side of == or ===. This is a limitation, in a sense, because sometimes 
//     we need to check if two objects have the same key/value pairs. 
//     JavaScript doesn't give us a way to do that.
//     Write a function objectsEqual that accepts two object arguments and returns true or 
//     false depending on whether the objects have the same key/value pairs.
function objectsEqual(obj1, obj2) {
  let [obj1Keys, obj1Values] = [Object.keys(obj1), Object.values(obj1)];
  let [obj2Keys, obj2Values] = [Object.keys(obj2), Object.values(obj2)];
  if (obj1Keys.length != obj2Keys.length || obj1Values.length !== obj2Values.length) {
    return false;
  }

  let [keyLen, valLen] = [obj1Keys.length, obj1Values.length];
  for (let i = 0; i < keyLen; i++) {
    if (obj1Keys[i] !== obj2Keys[i]) {
      return false;
    }
  }
  for (let j = 0; j < valLen; j++) {
    if (obj1Values[j] !== obj2Values[j]) {
      return false;
    }
  }
  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false

// (4) Create an object factory for a student object. The student object should have the 
//     following methods and it should produce the expected results demonstrated in the sample code:
//     > info: Logs the name and year of the student.
//     > addCourse: Enrolls student in a course. A course is an object literal that 
//                  has properties for its name and code.
//     > listCourses: Returns a list of the courses student has enrolled in.
//     > addNote: Adds a note property to a course. Takes a code and a note as an argument. 
//                If a note already exists, the note is appended to the existing one.
//     > updateNote: Updates a note for a course. Updating a note replaces the 
//                   existing note with the new note.
//     > viewNotes: Logs the notes for all the courses. Courses without notes are not displayed.
/*
function createStudent(name, year) {
	return {
    name,
    year,
    courses: [],
    codes: {},
    notes: {},

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    addCourse(courseObj) {
      this.courses.push(courseObj);
      this.codes[courseObj.code] = courseObj.name;
    },

    listCourses() {
      console.log(this.courses);
    },

    addNote(code, notes) {
      let subject = this.codes[code];
      this.notes[subject] = this.notes[subject] || [];
      this.notes[subject].push(notes);
    },

    viewNotes() {
      let keys = Object.keys(this.notes);
      for (let key of keys) {
        console.log(key + ": " + this.notes[key].join('; '));
      }
    },
    
    updateNote(code, notes) {
      let subject = this.codes[code];
      this.notes[subject] = [notes];
    },
	}
}

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
//foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
//foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"
*/

// (5) Create a school object. The school object uses the student object from the previous 
//     exercise. It has methods that use and update information about the student. Be sure 
//     to check out the previous exercise for the other arguments that might be needed by the 
//     school object. Implement the following methods for the school object:
//     > addStudent: Adds a student by creating a new student and adding the student to 
//                   a collection of students. The method adds a constraint that the year 
//                   can only be any of the following values: '1st', '2nd', '3rd', '4th', or 
//                   '5th'. Returns a student object if year is valid otherwise it 
//                   logs "Invalid Year".
//     > enrollStudent: Enrolls a student in a course.
//     > addGrade: Adds the grade of a student for a course.
//     > getReportCard: Logs the grades of a student for all courses. If the course has 
//                      no grade, it uses "In progress" as the grade.
//     > courseReport: Logs the grades of all students for a given course name. Only 
//                     student with grades are part of the course report.
//     To test your code, use the three student objects listed below. Using the three student objects, 
//     produce the following values from the getReportCard and courseReport methods respectively.

function School() {
  return {
    students: {},
    courses: {},
    subjects: {},

    addStudent(studentObj) {
      // this.students = {'foo': studentObject(name, year)};
      let VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];
      if (VALID_YEARS.includes(studentObj.year)) {
        this.students[studentObj.name] = studentObj;
      } else {
        throw "Invalid Year";
      }
    },

    enrollStudent(studentObj) {
      this.courses[studentObj.courses] = this.courses[studentObj.courses] || [];
      this.courses[studentObj.courses].push(studentObj);
    },
    
    addGrade(student, course, grade) {
      let studentName = student.name;
      let studentCourses = this.students[studentName].courses;
      for (let i = 0; i < studentCourses.length; i++) {
        if (studentCourses[i].name === course) {
          studentCourses[i]['grade'] = grade;
          this.subjects[course] = this.subjects[course] || [];
          this.subjects[course].push([studentName, grade]);
        }
      }
    },

    getReportCard(studentObj) {
      let studentCourses = this.students[studentObj.name].courses;
      for (let i = 0; i < studentCourses.length; i++) {
        let grade = studentCourses[i].grade;
        if (!grade) {
          grade = "In progress";
        }
        console.log('= ' + studentCourses[i].name + ': ' + grade);
      }
    },

    courseReport(course) {
      let total = 0;
      console.log('=' + course + ' Grades=');
      let nameAndGrades = this.subjects[course];
      if (!nameAndGrades) {
        console.log(undefined);
        return
      }
      let length = nameAndGrades.length;
      for (let [name, grade] of nameAndGrades) {
        total += grade;
        console.log(name + ': ' + grade);
      }
      console.log('---');
      console.log(total / length);
    },
  }
}

function createStudent(name, year) {
	return {
    name,
    year,
    courses: [],
    codes: {},
    notes: {},

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    addCourse(courseObj) {
      this.courses.push(courseObj);
      this.codes[courseObj.code] = courseObj.name;
    },

    listCourses() {
      console.log(this.courses);
    },

    addNote(code, notes) {
      let subject = this.codes[code];
      this.notes[subject] = this.notes[subject] || [];
      this.notes[subject].push(notes);
    },

    viewNotes() {
      let keys = Object.keys(this.notes);
      for (let key of keys) {
        console.log(key + ": " + this.notes[key].join('; '));
      }
    },
    
    updateNote(code, notes) {
      let subject = this.codes[code];
      this.notes[subject] = [notes];
    },
	}
}

let foo = createStudent('foo', '2nd');
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.addCourse({ name: 'Physics', code: 202 });

let bar = createStudent('bar', '1st');
bar.addCourse({ name: 'Math', code: 101 });

let qux = createStudent('qux', '2nd');
qux.addCourse({ name: 'Math', code: 101 });
qux.addCourse({ name: 'Advanced Math', code: 102 });

let school = School();
school.addStudent(foo);
school.addStudent(bar);
school.addStudent(qux);

school.enrollStudent(foo);
school.enrollStudent(bar);
school.enrollStudent(qux);

school.addGrade(foo, 'Math', 95);
school.addGrade(foo, 'Advanced Math', 90);
school.addGrade(bar, 'Math', 91);
school.addGrade(qux, 'Math', 93);
school.addGrade(bar, 'Advanced Math', 90);

school.getReportCard(foo);
school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');

// Examples of created student objects with grades; methods on the objects are not shown here for brevity.
// The following are only showing the properties that aren't methods for the three objects

/*
foo;
{
  name: 'foo',
  year: '3rd',
  courses: [
    { name: 'Math', code: 101, grade: 95, },
    { name: 'Advanced Math', code: 102, grade: 90, },
    { name: 'Physics', code: 202, }
  ],
}

bar;
{
  name: 'bar',
  year: '1st',
  courses: [
    { name: 'Math', code: 101, grade: 91, },
  ],
}

qux;
{
  name: 'qux',
  year: '2nd',
  courses: [
    { name: 'Math', code: 101, grade: 93, },
    { name: 'Advanced Math', code: 102, grade: 90, },
   ],
}

school.getReportCard(foo);
// = Math: 95
// = Advanced Math: 90
// = Physics: In progress

school.courseReport('Math');
// =Math Grades=
// foo: 95
// bar: 91
// qux: 93
// ---
// Course Average: 93

school.courseReport('Advanced Math');
// =Advanced Math Grades=
// foo: 90
// qux: 90
// ---
// Course Average: 90

school.courseReport('Physics');
// undefined
*/















