/**
 * Created by mlyskawi on 4/16/2017.
 */
import { Trie } from './Trie';
import * as rl from 'readline';
import * as fs from 'fs';
import * as path from 'path';

let r1 = rl.createInterface(process.stdin, process.stdout);

let database = new Trie();

class dictionary <T>{
    public primary:string;
    public secondary:string[];

    constructor(secondary?: string[],) {
        this.secondary = secondary || [];

    }


    public add(value){
        this.secondary.push(value)
    }
    public get(key){
        return this.secondary[key]
    }
}

fs.readFile(path.join(__dirname,"companies"+".dat"),"utf-8", (err, file) => {
    if (err) console.error("An error occurred while opening the file!", err);
    else
    {
        let dictionaries = [];
        let lines = file.split("\n");
        for(let i = 0; i<lines.length;i++){
            let names =lines[i].split("\t");
            let comp = new dictionary();
            // console.log(lines);
            for(let j = 0; j<names.length;j++){
                if (j==0){
                    comp.primary = names[j].split("\r")[0]
                }
                else{
                    comp.add(names[j].split("\r")[0])
                }

            }
            dictionaries.push(comp);
        }


        input(dictionaries);



    }
});

class score<T>{
    public name:string;
    public score:number;

}


function input(dict){
    let scoreborad = [];
    for(let x=0; x<dict.length;x++){
        let temp = new score();
        temp.name = dict[x].primary;
        temp.score = 0;
        scoreborad.push(temp);
    }
    function stdin(){
        // r1.question("", input1 => {
        let input1 = "Microsoft, snapchat, verizon  IOS";
            if(input1=="."){
                rl.close();
                return scoreborad;
            }

            database.add(input1.toLocaleLowerCase());
            for(let i=0; i<dict.length;i++){
                if(database.search(dict[i].primary.toLocaleLowerCase())){
                    scoreborad[i].score++;
                }

                for(let j=0; j<dict[i].secondary.length;j++){
                    if(database.search(dict[i].secondary[j].toLocaleLowerCase())){
                        scoreborad[i].score++;
                    }
                }


            }
        // });
        // return scoreborad
    }
    stdin();
    return console.log(scoreborad);
}

