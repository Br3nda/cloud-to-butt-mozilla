(function() {

function walk(node) 
{
    // I stole this function from here:
    // http://is.gd/mwZp7E
    
    var child, next;

    switch ( node.nodeType )  
    {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while ( child ) 
            {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case 3: // Text node
                        if(node.parentElement.tagName.toLowerCase() != "script") {
                            handleText(node);
                        }
            break;
    }
}
    
function handleText(textNode) {
    var yummyFood = ['pizza', 'chocolate', 'strawberries', 'kale', 'pancakes', 'roast potato', 'spaghetti', 'candy', 'coffee', 'beer'];
    var randNum =  Math.floor((Math.random() * 10) + 1); 
    var v = textNode.nodeValue;
    // Deal with the easy case
    v = v.replace(/\b(D|d)iet/g, function(match, p1, p2, offset, string) {
        return yummyFood[randNum];
    });

    textNode.nodeValue = v;

}

    function windowLoadHandler()
    {
        // Dear Mozilla: I hate you for making me do this.
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
            walk(e.originalTarget.body);
        });
    }

    window.addEventListener('load', windowLoadHandler);
}());
