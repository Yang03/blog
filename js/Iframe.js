function Iframe(){
    var doc = document;
    var now = function(){
        return +new Date;
    }
    var create = function(tagName, attrs){
        var tag = doc.createElement(tagName);
        for(var i in attrs){
            tag[ i ] = attrs[ i ];
            tag.setAttribute( i, attrs[ i ] );
        }
        return tag;
    }
    var hide = function(el){
        el.style.display = "none";
        return el;
    }
    var timer = now();
    var getIframe = function(){
        var body = document.body;
        return (function(){
            iframe = create( 'iframe', {
                "id": timer,
                "name": timer
            })
            return body.appendChild( hide( iframe ) );
        })()
    }
    var removeNode = function( node ){
        while ( node.firstChild ) {
            node.removeChild( node.firstChild );
        }
        if ( node.parentNode ){
            node.parentNode.removeChild( node );
        }
    }
    return function( config, callback ){

        var iframe = getIframe(),
            input;
        callbackName = 'dance_' + now() + ( Math.random() * 10000 | 0 ),
            param =  config.param;

        param.callback = "parent."+callbackName;

        var __form = create( 'form', {
            "target": timer,
            "method": 'post',
            "action": config.url
        })

        doc.body.appendChild( hide( __form ) );

        for ( var i in param ){
            input = create( 'input', {
                "name": i,
                "value": param[ i ]
            });
            __form.appendChild( input );
        }
        window[ callbackName ] = function( data ){
            try{
                callback.call( window, data );
            }catch(e){
                throw new Error( 'iframe request error' );
            }finally{
                delete( callbackName );
                removeNode( __form );
            }
        }

        __form.submit();


    }

}

var request = Iframe();
request({
    url:"http://yp.baixing.com/index.php",
    param:{name:"hello",callback:""}

},function(data){
    console.log(data)
})
