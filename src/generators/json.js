

if (typeof define !== 'function') { var define = require('amdefine')(module) }
	define([], function(){

		var openCurlBrace = "{",
		closeCurlBrace = "}",
		openBlockBrace = "[",
		closeBlockBrace = "]",
		comma = ",",
		quote = "\"",
		colon = ":",
		space = " ",
		indentCount = 0;

		var config;

		function resolveValue(typeName){
			var resolver = config.getType(typeName);

			var value = typeName;

			if (resolver !== undefined) {
				value = resolver.resolve();
			}

			return value;
		}

		function generate(tree, settings){

			config = settings;


			var output = writeObject(tree.nodes);

			return output;
		}

		function needQuotes(type){
			return (type == "string" || type == "date");
		}
		

		function writeObject(nodes){
			var output = "";
			indentCount++;
			output += openCurlBrace;                   
			for (var i = 0; i <= nodes.length - 1; i++) { 
				var node = nodes[i],
				isLast = (i == nodes.length - 1);

				output += quote + node.alias + quote + colon + space;	 
				if (needQuotes(node.baseType) && !node.isArray) {
					output += quote;
				}

				if (node.baseType !== "object" && node.nodes === undefined && node.isArray !== true) {
					output += resolveValue(node.type);
				}
				else{
					if (node.isArray){
						output += openBlockBrace;

						for (var i = 1; i <= node.count; i++) {
							
							if (node.baseType == "object") {
								output += writeObject(node.nodes);
							}
							else{
								if (needQuotes(node.baseType)){
									output+= quote;
								}
								output += resolveValue(node.type);
								if (needQuotes(node.baseType)){
									output+= quote;
								}
							}

							if (i < node.count) {
								output += comma;
							}
						};
						output += closeBlockBrace
					}
					else{
						
						output += writeObject(node.nodes);
						
					}

				}

				if (needQuotes(node.baseType) && !node.isArray) {
					output += quote;
				}

				if (!isLast) {
					output += comma;
				}

				

			}
			
			output += closeCurlBrace;

		return output;
			//var json =  JSON.parse(output);

			//return JSON.stringify(json,null,4);
		}


		return {
			generate: generate
		}
	});

