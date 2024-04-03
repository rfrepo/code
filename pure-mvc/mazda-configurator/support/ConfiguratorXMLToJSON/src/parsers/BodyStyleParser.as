package parsers
{
	import vo.data.BodyStyleVO;

	public class BodyStyleParser extends AbstractParser
	{	
		override public function parserData(configuratorXML:XML):void
		{
			createVOs( configuratorXML );
			groupDuplicateIds();
			condenseAvailabilityForEachGroup();
			removeLegarcyProperties( uniqueVOs );	
		};		
		
		private function createVOs( configuratorXML:XML ):void
		{
			var bodyStyleNode:XML;
			var bodyStyleVO:BodyStyleVO;					
			
			for each( bodyStyleNode in configuratorXML..bodystyle  )
			{
				bodyStyleVO = new BodyStyleVO();	
				
				bodyStyleVO.id = bodyStyleNode.@value.toString();
				bodyStyleVO.grade = super.createStringVector( bodyStyleNode.@series.toString() );
				bodyStyleVO.imageFileName = bodyStyleNode.file.@filename;
				bodyStyleVO.name = bodyStyleNode.title.toString();
				bodyStyleVO.description = bodyStyleNode.disclaimer.toString();		
				
				allVOs.push( bodyStyleVO );	
				
				addDependecyStructureToVO( bodyStyleVO );				
			};			
		};		
				
		override protected function mergeGroupVariantsPreconditionToFirstVO(VOVariants:Array, fistVariant:Object):void
		{
			super.mergeGroupVariantsPreconditionToFirstVO(VOVariants,fistVariant);
			fistVariant.dependencies.availability[0].preconditions =  
				removeDulicateIdsFromPreconditionsObject( fistVariant.dependencies.availability[0].preconditions )
		};		
	};
};