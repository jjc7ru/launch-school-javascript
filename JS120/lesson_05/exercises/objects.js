// @ 5:45
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
//     > updateNote: Updates a note for a course. Updating a note replaces the existing note with the new note.
//     > viewNotes: Logs the notes for all the courses. Courses without notes are not displayed.
/*
function createStudent(name, year) {
	return {
    courses: {},
    notes: {},

    info() {
      console.log(`${name} is a ${year} year student`);
    },

    addCourse(course) {
      this.courses[course.code] = course.name;
    },

    listCourses() {
      let courses = [];
      for (let code of Object.keys(this.courses)) {
        let temp = {name: this.courses[code], code: code};
        courses.push(temp);
      }
      console.log(courses);
    },

    addNote(code, notes) {
      let subject = this.courses[code];
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
      let subject = this.courses[code];
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
//                   '5th'. Returns a student object if year is valid otherwise it logs "Invalid Year".
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
    addStudent() {},
    enrollStudent() {},
    addGrade() {},
    getReportCard(),
    courseReport(),
  }
}

function createStudent(name, year) {
	return {
    courses: {},
    notes: {},

    info() {
      console.log(`${name} is a ${year} year student`);
    },

    addCourse(course) {
      this.courses[course.code] = course.name;
    },

    listCourses() {
      let courses = [];
      for (let code of Object.keys(this.courses)) {
        let temp = {name: this.courses[code], code: code};
        courses.push(temp);
      }
      console.log(courses);
    },

    addNote(code, notes) {
      let subject = this.courses[code];
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
      let subject = this.courses[code];
      this.notes[subject] = [notes];
    },
	}
}




















