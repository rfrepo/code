package parsers
{
	import vo.data.WheelVO;

	public class WheelParser extends AbstractParser
	{	
		override public function parserData(configuratorXML:XML):void
		{
			createVOs( configuratorXML );
			groupDuplicateIds();
			condenseAvailabilityForEachGroup();
			removeLegarcyProperties( uniqueVOs );	
			placePreconditionsIntoGrade();
		}		
		
		private function createVOs( configuratorXML:XML ):void
		{
			var wheelNode:XML;
			var wheelVO:WheelVO;					
			
			for each( wheelNode in configuratorXML..wheel  )
			{
				wheelVO = new WheelVO();	
				
				wheelVO.id = wheelNode.@value.toString();
				wheelVO.price = wheelNode.@price.toString();	
				wheelVO.grade = super.createStringVector( wheelNode.@series.toString() );
				wheelVO.engine = super.createStringVector( removeBodyStyleSeriesIds( wheelNode.@engine.toString() ) );
				wheelVO.imageFileName = wheelNode.file.@filename;
				wheelVO.name = wheelNode.@title.toString();
				wheelVO.description = wheelNode.@description.toString();		
				
				allVOs.push( wheelVO );	
				
				addDependecyStructureToVO( wheelVO );				
			};			
		};		
				
		override protected function mergeGroupVariantsPreconditionToFirstVO(VOVariants:Array, fistVariant:Object):void
		{
			super.mergeGroupVariantsPreconditionToFirstVO(VOVariants,fistVariant);
			fistVariant.dependencies.availability[0].preconditions =  
				removeDulicateIdsFromPreconditionsObject( fistVariant.dependencies.availability[0].preconditions )
		};
		
		private function placePreconditionsIntoGrade():void
		{
			for( var i:uint; i < allVOs.length; i++)
			{
				restructureAvailabiltyHierarchy( allVOs[i].dependencies );
			};
		};
		
		private function restructureAvailabiltyHierarchy(dependencies:*):void
		{
			var gradePreconditions:Array = [];
			var numOfPreconditions:Number = dependencies.availability.length;
			var preconditions:Array = [].concat( dependencies.availability);
			var engines:Array = []
			
			for( var i:uint; i < numOfPreconditions; i++)
			{
				if(preconditions[i].type == "grade")
				{
					gradePreconditions.push( preconditions[i] );					
				}
				else
				{
					engines.push( preconditions[i] );
				}
			}
						
			for( var j:uint; j < gradePreconditions.length; j++)
			{
				gradePreconditions[j].preconditions = removeDulicateIdsFromPreconditionsObject( [].concat( engines ) );
			}
			
			dependencies.availability = [].concat( gradePreconditions );			
		}	
		
	};
};