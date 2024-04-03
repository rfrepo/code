package parsers
{
	import vo.OptionPackVO;

	public class OptionPackParser extends AbstractParser
	{
		protected const TRIM:String = "trim";
		
		override public function parserData(configuratorXML:XML):void
		{
			createVOs( configuratorXML );
			groupDuplicateIds();
			condenseAvailabilityForEachGroup();
			removeLegarcyProperties( uniqueVOs );
		}
		
		private function createVOs( configuratorXML:XML ):void
		{
			var optionPackNode:XML;
			var optionPackVO:OptionPackVO;					
			
			for each( optionPackNode in configuratorXML..optionPack )
			{
				optionPackVO = new OptionPackVO();	
				
				optionPackVO.id = removeBodyStyleSeriesIds( optionPackNode.@value );
				optionPackVO.bodyStyle = optionPackNode.@bodystyle.toString();
				optionPackVO.grade = optionPackNode.@series.toString();
				optionPackVO.engine = createStringVector( removeBodyStyleSeriesIds(optionPackNode.@engine) );
				optionPackVO.price = optionPackNode.@price.toString();
				
				var trimCodes:Array = [];
				createMultiplePreconditionObjects( TRIM, createStringVector( optionPackNode.@trimCodes.toString() ), trimCodes.push);
				optionPackVO.trimCodes = trimCodes;
					
				optionPackVO.name = removeBodyStyleSeriesIds( optionPackNode.title.valueOf() );
				optionPackVO.imageFileName = optionPackNode.file.@filename;		
				
				allVOs.push( optionPackVO );	
				
				addDependecyStructureToVO( optionPackVO );
			};					
		};	
		
		override protected function mergeGroupVariantsPreconditionToFirstVO(VOVariants:Array, fistVariant:Object):void
		{
			super.mergeGroupVariantsPreconditionToFirstVO(VOVariants,fistVariant);
			fistVariant.dependencies.availability[0].preconditions =  
			removeDulicateIdsFromPreconditionsObject( fistVariant.dependencies.availability[0].preconditions );
			
			fistVariant.dependencies.selection = 
			removeDulicateIdsFromPreconditionsObject( fistVariant.dependencies.selection );
		}
			
	};
};