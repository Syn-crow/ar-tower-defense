            // store visibility data in object;
            //  can only draw line when both are visible.
            let markerVisible = { m_tower1: false, m_tower2: false, board: false };
            
            AFRAME.registerComponent('registerevents', {
                init: function () 
                {
                    let marker = this.el;
                    
                    marker.addEventListener('markerFound', function() {
                        markerVisible[ marker.id ] = true;
                        console.log("found");
                    });
            
                    marker.addEventListener('markerLost', function() {
                        markerVisible[ marker.id ] = false;
                        console.log("lost");
                    });
                }
            });
            
            AFRAME.registerComponent('run', {
                init: function()
                {
                    this.m_tower1 = document.querySelector("#m_tower1");
                    this.m_tower2 = document.querySelector("#m_tower2");
                    this.m_target = listEnnemy[0];
                    this.posTower1 = new THREE.Vector3();
                    this.posTower2 = new THREE.Vector3();
                    this.posTarget = new THREE.Vector3();
                    this.selectedEnnemy = 0;

                    let scene = document.querySelector('a-scene').object3D;
                    
                    // Line 1
                    this.geometry1 = new THREE.Geometry();
                    this.geometry1.vertices.push( new THREE.Vector3(-1,-1,-1) );
                    this.geometry1.vertices.push( new THREE.Vector3( 1, 1, 1) );
                    this.material1 = new THREE.LineBasicMaterial( {color: 0x00b5e1, linewidth: 5} );
                    this.line1 = new THREE.Line( this.geometry1, this.material1 );
                    scene.add( this.line1 );

                    // Line 2
                    this.geometry2 = new THREE.Geometry();
                    this.geometry2.vertices.push( new THREE.Vector3(-1,-1,-1) );
                    this.geometry2.vertices.push( new THREE.Vector3( 1, 1, 1) );
                    this.material2 = new THREE.LineBasicMaterial( {color: 0x8f00ff, linewidth: 5} );
                    this.line2 = new THREE.Line( this.geometry2, this.material2 );
                    scene.add( this.line2 );
                },

                
                tick: function (time, deltaTime) 
                {   
                    if ( markerVisible["m_tower1"] && markerVisible["board"] )
                    {   
                        console.log("Fire !")
                        this.m_tower1.object3D.translateY(3.1);
                        this.m_target.object3D.translateY(0.4);
                        this.m_tower1.object3D.getWorldPosition(this.posTower1); 
                        this.m_target.object3D.getWorldPosition(this.posTarget);
                        this.m_tower1.object3D.translateY(-3.1);
                        this.m_target.object3D.translateY(-0.4);
                        this.geometry1.vertices[0] = this.posTower1;
                        this.geometry1.vertices[1] = this.posTarget;
                        this.geometry1.verticesNeedUpdate = true;
                        if (this.posTower1.distanceTo(this.posTarget) < 4){
                            this.line1.visible = true;
                        }
                        else{
                            this.line1.visible = false;
                        }
                    }
                    else
                    {
                        this.line1.visible = false;
                    }
                    if ( markerVisible["m_tower2"] && markerVisible["m_target"] )
                    {   
                        this.m_tower2.object3D.translateY(3.1);
                        this.m_target.object3D.translateY(0.4);
                        this.m_tower2.object3D.getWorldPosition(this.posTower2); 
                        this.m_target.object3D.getWorldPosition(this.posTarget);
                        this.m_tower2.object3D.translateY(-3.1);
                        this.m_target.object3D.translateY(-0.4);
                        this.geometry2.vertices[0] = this.posTower2;
                        this.geometry2.vertices[1] = this.posTarget;
                        this.geometry2.verticesNeedUpdate = true;
                        if (this.posTower2.distanceTo(this.posTarget) < 4){
                            this.line2.visible = true;
                        }else{
                            this.line2.visible = false;
                        }
                    }
                    else
                    {
                        this.line2.visible = false;
                    }
                }
            });
