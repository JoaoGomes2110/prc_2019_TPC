const Cinema = module.exports
var axios = require('axios')

async function execQuery(q){
    try{
        var encoded = encodeURIComponent(q)
        var response = await axios.get('http://localhost:7200/repositories/cinema' + '?query=' + encoded)
        return response.data.results.bindings
    }
    catch(error){
        return 'Erro: ' + error
    }
   
}

Cinema.listarFilmes = async()=>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select * where {
        ?filme a :Filme.
        ?filme :título ?titulo.
        ?filme :ano ?ano.
    }
    order by desc(?ano) ?titulo
    limit 100`
    
    var res = execQuery(query)
    return res
}

Cinema.infoFilme = id =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select * where {
        :${id} :título ?tit;
               :ano ?ano.
    }`
    
    return execQuery(query)
}

Cinema.filmeAnos = id =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?ano where {
        :${id} :ano ?ano.
    }`
    
    return execQuery(query)
}

Cinema.filmeAtores = id =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?a ?nomeAtor where {
        :${id} :temAtor ?a.
        ?a :nome ?nomeAtor.
    }`
    
    return execQuery(query)
}

Cinema.filmeGeneros = id =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?g where {
        :${id} :temGénero ?g.
    }`
    
    return execQuery(query)
}

Cinema.listarAtores = ()=>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?s ?nome where {
        ?s a :Pessoa.
        ?s :atuou ?f.
        ?s :nome ?nome.
    }
    order by ?nome
    limit 500`
    
    return execQuery(query)
}

Cinema.infoAtor = id =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?nome where {
        :${id} :nome ?nome.
    }`
    
    return execQuery(query)
}

Cinema.atorFilmes = id =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?f ?ftit where {
        :${id} :atuou ?f.
        ?f :título ?ftit.
    }`
    
    return execQuery(query)
}

Cinema.listarGeneros = ()=>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?s where {
        ?s a :Género.
    }
    order by ?s`
    
    return execQuery(query)
}

Cinema.generoFilmes = id =>{
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?f ?ftit where {
        :${id} :éGéneroDe ?f.
        ?f :título ?ftit.
    }`
    
    return execQuery(query)
}