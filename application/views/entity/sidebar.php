<div class="yui-b" id="sidebar">
	<h4>Entities</h4>
	<ul>	
	<?php foreach($entities as $entity) : ?>
		<li>
			<a href="/index.php/entity/edit/<?php print $entity['id'] ?>"><?php print $entity['name'] ?></a>
		</li>
	<?php endforeach ?>
	</ul>
</div>