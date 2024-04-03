package parsers
{
	public class EngineParser
	{
		public function EngineParser(  )
		{
			//createJSON( engines );
		};
				
		public function createJSON( list:* ):void
		{
			var engine:Object
			var store:Object = {};
			var currentItem:*;
			
			store.engines = [];
			
			
			for(var i:uint = 0; i < list.length; i++)
			{
				engine = {};
				currentItem =  list[i][0]
				
				engine.id = currentItem.id.split("_")[0];
				engine.taxIncrease = currentItem.taxIncrease;
				engine.fuelType = currentItem.fuelType;
				engine.engineSize = currentItem.engineSize;
				engine.enginePower = currentItem.enginePower;
				engine.transmission = currentItem.transmission;
				engine.imageFileName = currentItem.imageFileName
				engine.name = currentItem.title
				engine.emissions = currentItem.disclaimer;	
				engine.availability= createAvailabilityPreconditions( list[i] ) ;
				store.engines.push(engine)
				
			};
			
			var j:* = JSON.stringify(store)
			trace(j);			
		}
		
		public function createAvailabilityPreconditions( list:* ):Array
		{		
			var preconditions:Array = [];
			var currentItem:*;
			var precondition:Object;
			
			for(var i:uint = 0; i < list.length; i++)
			{
				currentItem =  list[i];
				
				if( currentItem.bodystyle )
				{
					precondition = createPrecondition( currentItem.bodystyle, "bodyStyle" );					
				};		
				
				if( currentItem.series )
				{
					createGradePrecondition( currentItem.series, precondition.preconditions.push );							
				};	
				
				preconditions.push( precondition )
			};
			
			return preconditions;
		};
		
		public function createGradePrecondition( list:*, callBack:Function ):void
		{
			for( var i:uint = 0; i < list.length; i++ )
			{
				callBack( createPrecondition( list[i], "grade") )
			}
		};
		
		public function createPrecondition(id:String, type:String):Object
		{
			return{
				"type":type,
				"id":id,
				"preconditions":[]
			}
		}
	}
}