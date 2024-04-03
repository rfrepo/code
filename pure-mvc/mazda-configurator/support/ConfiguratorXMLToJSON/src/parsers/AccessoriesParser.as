package parsers
{
	import vo.AccessoryVO;
	//import vo.data.TrimVO;

	public class AccessoriesParser extends AbstractParser
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
			var accessoriesNode:XML;
			var accessoryVO:AccessoryVO;					
			
			for each( accessoriesNode in configuratorXML..accessories  )
			{
				accessoryVO = new AccessoryVO();	
				
				accessoryVO.id = removeBodyStyleSeriesIds( accessoriesNode.@value );
				accessoryVO.bodyStyle = accessoriesNode.@bodystyle.toString();
				accessoryVO.grade = super.createStringVector( accessoriesNode.@series.toString() );
				accessoryVO.engine = createStringVector( removeBodyStyleSeriesIds(accessoriesNode.@engine) );
				accessoryVO.unit = accessoriesNode.@unit;
				accessoryVO.engine = createStringVector( removeBodyStyleSeriesIds(accessoriesNode.@engine) );
				accessoryVO.price = parsePrice( accessoriesNode.prices );
				accessoryVO.name = removeBodyStyleSeriesIds( accessoriesNode.title.valueOf() );
				accessoryVO.imageFileName = accessoriesNode.file.@filename;				
				
				allVOs.push( accessoryVO );	
				
				addDependecyStructureToVO( accessoryVO );				
			};			
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
			var numOfPreconditions:Number = dependencies.availability[0].preconditions.length;
			var preconditions:Array = [].concat( dependencies.availability[0].preconditions);
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
				gradePreconditions[j].preconditions = [].concat( engines );
			}
			
			dependencies.availability = [].concat( gradePreconditions );			
		}	
		
		override protected function mergeGroupVariantsPreconditionToFirstVO(VOVariants:Array, fistVariant:Object):void
		{
			super.mergeGroupVariantsPreconditionToFirstVO(VOVariants,fistVariant);
			fistVariant.dependencies.availability[0].preconditions =  
			removeDulicateIdsFromPreconditionsObject( fistVariant.dependencies.availability[0].preconditions )
		}
				
	};
};