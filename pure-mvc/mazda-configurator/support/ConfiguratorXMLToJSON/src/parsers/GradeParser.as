package parsers
{
	import vo.data.GradeVO;

	public class GradeParser extends AbstractParser
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
			var gradeNode:XML;
			var gradeVO:GradeVO;					
			
			for each( gradeNode in configuratorXML..series  )
			{
				gradeVO = new GradeVO();	
				
				gradeVO.id = gradeNode.@value.toString();
				gradeVO.bodyStyle = super.createStringVector( gradeNode.@bodystyle.toString() );
				gradeVO.imageFileName = gradeNode.file.@filename;
				gradeVO.name = gradeNode.title.toString();
				gradeVO.description = gradeNode.disclaimer.toString();		
				
				allVOs.push( gradeVO );	
				
				addDependecyStructureToVO( gradeVO );				
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