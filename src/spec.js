import test from "ava";
import ArrayMixer from "./array-mixer";

let colors = ["red", "green", "blue"];

let people = [
    {id: 1, name: "Alberto"},
    {id: 2, name: "Bruna"},
    {id: 3, name: "Caio"},
    {id: 4, name: "Daniel"},
    {id: 5, name: "Evaristo"},
    {id: 6, name: "Fernanda"},
    {id: 7, name: "Godofredo"},
    {id: 8, name: "Humberto"},
    {id: 9, name: "Ivan"},
    {id: 10, name: "John"}
];

let animals = [
    {id: 1, name: "Alligator"},
    {id: 2, name: "Bear"},
    {id: 3, name: "Cat"}
];

test("Returns original list when order params has only one item", t =>{
    const mixed = ArrayMixer({C: colors}, ["C"]);
    mixed.forEach((item, index) => t.deepEqual(item, colors[index]));
});

//     it("Reorder two same size arrays alternately", function(){});
//     it("Reorder two same size arrays disproportionately", function(){});
//     it("Reorder two different size arrays alternately", function(){});
//     it("Reorder two different size arrays disproportionately", function(){});
//     it("Reorder three arrays using shortcut notation for order param", function(){});
//     it("Reorder four different arrays", function(){});