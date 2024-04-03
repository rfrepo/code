package parsers
{
	public class AbstractParser
	{		
		private var dependencyHierarchy:Array = ["bodyStyle","grade","engine"]
		private var predconditionTypes:Array = ["bodyStyle","grade","engine"]
		private var legarcyProperties:Array = ['optionPackCodes','price','bodyStyle','grade','engine','trimCodes' ];
		private const GRADE:String = "grade";
		
		public var allVOs:Vector.<Object> = new Vector.<Object>()
		
		public var groupedOnIdVOs:Array;
		
		public var uniqueVOs:Vector.<Object> = new Vector.<Object>()
		
		public function AbstractParser(){}
		
		public function parserData(configuratorXML:XML):void{}
		
		protected function createStringVector( value:String ):Vector.<String>
		{
			value = ( value == "null" )? "" : value;
			
			var valueArray:Array = value.split(",");
			
			var vectors:Vector.<String> = new Vector.<String>();
			
			for each( var item:String in valueArray ) vectors.push( item );
			
			return vectors;
		};
		
		
		protected function removeBodyStyleSeriesIds( value:String ):String
		{  
			var bodyStyleGradesIds:Array = [ "_2200", "_5500", "_001", "_002","_003" ];
			var id:String;
			
			for (var i:int = 0; i < bodyStyleGradesIds.length; i++) 
			{
				id = bodyStyleGradesIds[ i ];	
				value = value.split(id).join("");
			};
			
			return value;
		};	
		
		protected function groupItemsById( collection:* ):Array
		{
			var groupedById:Array = [];
			var lookedUpId:Object ={};
			var id:String;
			
			for(var i:uint = 0; i < collection.length; i++)
			{	
				id = collection[i].id;
				
				if( lookedUpId[id] ) continue;
					
				lookedUpId[id] = true;
				
				groupedById.push( getElementsById( collection, id ) );
			};
			
			return groupedById;
		};
		
		private function getElementsById( list:*, id:String ):Array
		{
			var group:Array = [];
			
			for(var i:uint = 0; i < list.length; i++)
			{			
				if( list[i].id === id ) 
				{			
					group.push( list[i] );
				};
			};
			
			return group; 			
		};
		
		protected function removeLegarcyProperties(vos:*):void
		{		
			for (var i:int = 0; i < vos.length; i++) 
			{				
				removePropertyFromProperty( vos[i] );			
			};			
		};
		
		private function removePropertyFromProperty( vo:Object ):void
		{
			var propertyName:String;
			
			for (var i:int = 0; i < legarcyProperties.length; i++) 
			{
				propertyName = legarcyProperties[ i ];
				
				if( vo[propertyName] )
				{
					delete vo[propertyName]
				};				
			};
		};
		
		protected function addDependecyStructureToVO(vo:*):void
		{			
			vo.dependencies = {};
			
			vo.dependencies.availability = [];			
			createAvailabilityDependency( vo.dependencies.availability.push, vo );
			
			createPriceDependency( vo.dependencies, vo );	
			
			createSelectionDependency( vo.dependencies, vo );			
		};
		
		private function createAvailabilityDependency( savePreconditionMethod:Function, vo:* ):void
		{
			var preconditionValue:*;
			var preconditionId:String;
			var preconditionVO:Object;
			var preconditionType:String;
			var savePreconditionMethod:Function;
									
			for(var i:uint = 0; i < predconditionTypes.length; i++ )
			{
				preconditionType =  predconditionTypes[i];	
				preconditionValue = vo[preconditionType];	
				
				if ( !preconditionValue ) continue;
				
				if( preconditionValue is String )
				{			
					preconditionVO = createPrecondition( preconditionValue, preconditionType );
					savePreconditionMethod( preconditionVO );
					savePreconditionMethod = preconditionVO.preconditions.push;
				}
				else
				{
					createMultiplePreconditionObjects( preconditionType, preconditionValue, savePreconditionMethod );
				};
			};
		};
		
		private function createPriceDependency( VODependencies:Object, vo:* ):void
		{		
			if(vo.price) 
			{
				VODependencies.price = [].concat( vo.price )
			}
		}
		
		private function createSelectionDependency( VODependencies:Object, vo:* ):void
		{		
			if( vo.optionPackCodes || vo.trimCodes ) 
			{
				var property:* = vo.optionPackCodes? vo.optionPackCodes : vo.trimCodes
				VODependencies.selection = [].concat( property );
			}
		}
		
		protected function createMultiplePreconditionObjects( type:String, preconditions:*,savePreconditionMethod:Function ):void
		{
			for (var i:int = 0; i < preconditions.length; i++) 
			{
				savePreconditionMethod( createPrecondition( preconditions[i], type ) );	
			};			
		};
		
		public function createPrecondition(id:String, type:String, value:String=""):Object
		{
			return{
				"type":type,
				"id":id,
				"value":value,
				"preconditions":[]
			};
		};
		
		
		protected function groupDuplicateIds():void
		{
			groupedOnIdVOs = groupItemsById( allVOs );				
		};
		
		protected function condenseAvailabilityForEachGroup():void
		{			
			var VOVariants:Array;
			var fistVariant:Object;
			
			for (var i:int = 0; i < groupedOnIdVOs.length; i++) 
			{
				VOVariants = groupedOnIdVOs[i];
				fistVariant= groupedOnIdVOs[i][0];
				
				uniqueVOs.push(fistVariant)
				
				mergeGroupVariantsPreconditionToFirstVO(VOVariants,fistVariant);				
			};						
		};
		
		protected function mergeGroupVariantsPreconditionToFirstVO(VOVariants:Array, fistVariant:Object):void
		{
			for (var j:int = 0; j < VOVariants.length; j++) 
			{	
				if( fistVariant == VOVariants[j]) continue;
				
				fistVariant.dependencies.availability = 
				fistVariant.dependencies.availability.concat( VOVariants[j].dependencies.availability);	
								
				fistVariant.dependencies.price =
				fistVariant.dependencies.price.concat( VOVariants[j].dependencies.price );
				
				if( fistVariant.dependencies.selection )
				{
					fistVariant.dependencies.selection = 
					fistVariant.dependencies.selection.concat( VOVariants[j].dependencies.selection );
				};	
				
				if( fistVariant.optionPackCodes )
				{
					fistVariant.optionPackCodes = fistVariant.optionPackCodes.concat( VOVariants[j].optionPackCodes ) 
				}

			};			
			
		};
		
		protected function removeDulicateIdsFromPreconditionsObject(list:*):Array
		{
			var uniqueIds:Array = [];
			var store:Object = {};
			
			for (var i:int = 0; i < list.length; i++) 
			{
				store[ list[i].id ] = list[i];				
			};	
			
			for (var precondition:Object in store )
			{
				uniqueIds.push( store[ precondition ]);
			};
			
			return uniqueIds;
		}
	
		protected function parsePrice(priceXML:XMLList):Array
		{
			var trimPriceNode:XML;
			var prices:Array = [];
			for each( trimPriceNode in priceXML..price )
			{
				prices.push( createPrecondition( trimPriceNode.@series, GRADE, trimPriceNode.@value ) );
			};	
			return prices;
		};		
		
	};
}