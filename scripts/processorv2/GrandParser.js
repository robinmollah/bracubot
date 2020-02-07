
class GrandParser {
    constructor(){
        this.parser = [];
    }

    parse(word){
        let parseResult = [];
        for(let parser of this.parser){
            parseResult.push(parse(word));
        }
        return parseResult;
    }

    add(parser){
        // TODO don't push if same parser already exist
        this.parser.push(parser);
    }

    remove(parser){
        for(let i = 0; i < this.parser.length; i++){
            if(typeof this.parser[i] == parser){
               this.parser.splice(i, 1);
               return true;
            }
        }
        return false;
    }

    doesContain(parserType){
        for(let parser of this.parser){
            if(typeof parser == parserType){
                return true;
            }
        }
        return false;
    }
}