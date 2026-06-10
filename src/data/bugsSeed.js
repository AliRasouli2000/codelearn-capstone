export const bugs = [
    {
      code: `
  function greet(name {
    console.log("Hello " + name);
  }
  `,
      missing: ")"   // missing closing parenthesis
    },
    {
      code: `
  const add = (a, b) => {
    return a + b
  `,
      missing: "}"   // missing closing brace
    },
    {
      code: `
  for (let i = 0; i < 3; i++ {
    console.log(i);
  }
  `,
      missing: ")"   // missing parenthesis
    },
    {
      code: `
  const user = {
    name: "Alex"
    age: 22
  };
  `,
      missing: ","   // missing comma between properties
    },
    {
      code: `
  if (value > 10 {
    console.log("Big");
  } else {
    console.log("Small");
  }
  `,
      missing: ")"   // missing parenthesis
    },
    {
      code: `
  let items = [1, 2, 3
  console.log(items);
  items.push(4);
  `,
      missing: "]"   // missing closing bracket
    },
    {
      code: `
  function multiply(x, y) {
    return x * y;
   console.log("Done");
  }
  `,
      missing: "}"   // missing brace before console.log
    },
    {
      code: `
  const message = "Welcome
  console.log(message);
  `,
      missing: `"`   // missing closing quote
    },
    {
      code: `
  document.querySelector("#app").innerText =
    "Loaded!"
  `,
      missing: ")"   // assignment line missing closing parenthesis from querySelector
    },
    {
      code: `
  try {
    JSON.parse("{bad json}");
  } catch e) {
    console.log("Error");
  }
  `,
      missing: "("   // missing opening parenthesis after catch
    }
  ];
  