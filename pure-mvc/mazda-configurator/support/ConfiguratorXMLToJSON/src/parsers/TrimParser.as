package parsers
{
	import vo.data.TrimVO;

	public class TrimParser extends AbstractParser
	{			
		override public function parserData(configuratorXML:XML):void
		{
			createVOs( configuratorXML );
			groupDuplicateIds();
			condenseAvailabilityForEachGroup();
			removeLegarcyProperties( uniqueVOs );
		}
		
		private function createVOs( configuratorXML:XML ):void
		{
			var trimNode:XML;
			var trimVO:TrimVO;					
			var grade:String;
			for each( trimNode in configuratorXML..trim )
			{
				trimVO = new TrimVO();	
				
				trimVO.id = removeBodyStyleSeriesIds( trimNode.@value );
				trimVO.bodyStyle = trimNode.@bodystyle.toString();
				//trace(trimNode.@series)
				grade = trimNode.@series + "";
				trimVO.grade = createStringVector(grade);
				trimVO.price = parsePrice( trimNode.prices );
				trimVO.name = removeBodyStyleSeriesIds( trimNode.title.valueOf() );
				trimVO.imageFileName = trimNode.file.@filename;	
				trimVO.optionPackCodes = createStringVector(trimNode.@optionPackCodes);		
				allVOs.push( trimVO );	
				
				addDependecyStructureToVO( trimVO );
			};					
		};	
		
		override protected function mergeGroupVariantsPreconditionToFirstVO(VOVariants:Array, fistVariant:Object):void
		{
			super.mergeGroupVariantsPreconditionToFirstVO(VOVariants,fistVariant);
			fistVariant.dependencies.availability[0].preconditions =  
				removeDulicateIdsFromPreconditionsObject( fistVariant.dependencies.availability[0].preconditions );
			
			//fistVariant.dependencies.selection = 
			//removeDulicateIdsFromPreconditionsObject( fistVariant.dependencies.selection );
			
			fistVariant.dependencies.price =
			removeDulicateIdsFromPreconditionsObject( fistVariant.dependencies.price );
			
			///fistVariant.optionPackCodes = removeDulicateIdsFromPreconditionsObject( fistVariant.dependencies.price );
		}
				
	};
};