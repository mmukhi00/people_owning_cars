import { find,remove,map, get, filter } from "lodash";
import { people,cars } from "./data";


// people
const typeDefs = `
type Person{
    id:String!
    firstName:String
    lastName:String
}
type Car{
    id:String!
    year:Int,
    make:String,
    model:String,
    price:Float,
    personId:String
}
type Query{
    people:[Person]
    person(id:String!):Person
    cars:[Car]
    car(id:String!):Car
     personWithCar(personId:String!):[Car]
}
type Mutation{
    addPerson(id:String!,firstName:String!,lastName:String!):Person
    updatePerson(id:String!,firstName:String!,lastName:String!):Person
    removePerson(id:String!):Person
    addCar(id:String!,year:Int,make:String,model:String,price:Float,personId:String):Car
    updateCar(id:String!,year:Int,make:String,model:String,price:Float,personId:String):Car
    removeCar(id:String!):Car
   

}
`

const resolvers = {
    Query: {
        people: () => people,
        person: (root, args) => {
            return find(people,{id:args.id})
        },
        cars: () => cars,
        car: (root, args) => {
            return find(cars, { id: args.id })
        },
        personWithCar: (root, args) => { 
           const car = filter(cars, (car)=>car.personId===args.personId )
            console.log(car)
            return car
        }

    },
    Mutation: {
        addPerson: (root, args) => {
            const newPerson = {
                id: args.id,
                firstName: args.firstName,
                lastName:args.lastName
            } 
            people.push(newPerson)
            return newPerson
        },
        updatePerson: (root,args)=>{
            const person = find(people, { id: args.id })
            if (!person)
            {
              throw new Error(`Couldn't find person`)  
            }
            person.firstName = args.firstName
            person.lastName = args.lastName
            
            return person
        },
        removePerson: (root, args) => {
            const removePerson = find(people, { id: args.id })
            if (!removePerson)
            {
                throw new Error(`Couldn't find person with id ${args.id}`)
            }
            remove(people, p => {
                return p.id===args.id
            })
            return removePerson
        },
        addCar: (root, args) => {
            const newCar={
                id: args.id,
                year: args.year,
                make: args.make,
                model: args.model,
                price: args.price,
                personId:args.personId
            }
            cars.push(newCar)
            return newCar
        },
        updateCar: (root, args) => {
            const car = find(cars, { id: args.id })
            if (!car){
                throw new Error(`Couldn't find car with id ${args.id}`)
            }
            car.year = args.year
            car.make = args.make
            car.model = args.model
            car.price = args.price
            car.personId = args.personId
            return car
        },
        removeCar: (root, args) => {
            const car = find(cars, { id: args.id })
            if (!car) {
                throw new Error(`Couldn't find car with id ${args.id}`)
            }
            remove(cars, c => {
               return c.id===args.id
            })
            return car
        },
       
        
    }

}

export {typeDefs,resolvers }



